package main

import (
	"crypto"
	"crypto/rsa"
	"crypto/x509"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"encoding/pem"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/rs/cors"
)

// FileVerificationPayload represents the JSON structure of the payload containing the hash and public key
type FileVerificationPayload struct {
	Hash      string `json:"hash"`
	KeyFile string `json:"keyFile"`
}

// KeyFilePayload represents the JSON structure of the payload containing the key file data
type KeyFilePayload struct {
	KeyFile string `json:"keyFile"`
}

func main() {
	// Define the endpoint for verifying the file
	http.HandleFunc("/api/verify-file", verifyFileHandler)

	// Define the endpoint for downloading the public key
	http.HandleFunc("/api/download-public-key", downloadPublicKeyHandler)

	// Use CORS middleware to allow requests from http://localhost:3000
	handler := cors.AllowAll().Handler(http.DefaultServeMux)

	// Start the HTTP server with CORS middleware
	fmt.Println("Server listening on port 8080...")
	http.ListenAndServe(":8080", handler)
}

func verifyFileHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		// Parse the JSON body
		var payload FileVerificationPayload
		if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			fmt.Fprintf(w, "Error parsing JSON body: %v", err)
			return
		}

		// Retrieve the file byte array based on the provided hash
		fileData, err := retrieveFileData(payload.Hash)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprintf(w, "Error retrieving file data: %v", err)
			return
		}

		// Decode the base64-encoded public key
		publicKeyBytes, err := base64.StdEncoding.DecodeString(payload.KeyFile)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprintf(w, "Error decoding base64 public key: %v", err)
			return
		}

		// Parse the public key
		publicKey, err := parsePublicKey(publicKeyBytes)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprintf(w, "Error parsing public key: %v", err)
			return
		}

		// Verify the file using the parsed public key
		err = verifyFile(fileData, publicKey)
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			fmt.Fprintf(w, "File verification failed: %v", err)
			return
		}

		// Verification successful
		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "File verification successful")

	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprintf(w, "Method not allowed")
	}
}

func downloadPublicKeyHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		// Parse the JSON body
		var payload KeyFilePayload
		if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			fmt.Fprintf(w, "Error parsing JSON body: %v", err)
			return
		}

		// Decode the base64-encoded public key data
		decodedKeyData, err := base64.StdEncoding.DecodeString(payload.KeyFile)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprintf(w, "Error decoding base64 key data: %v", err)
			return
		}

		// Set response headers for file download
		w.Header().Set("Content-Disposition", "attachment; filename=public_key.pem")
		w.Header().Set("Content-Type", "application/octet-stream")

		// Write the decoded public key data to the response
		w.Write(decodedKeyData)

	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprintf(w, "Method not allowed")
	}
}

func retrieveFileData(hash string) ([]byte, error) {
	// Make an API call to retrieve the file data based on the provided hash
	resp, err := http.Get(fmt.Sprintf("http://localhost:8000/api/file/%s", hash))
	if err != nil {
		return nil, fmt.Errorf("error making API call: %v", err)
	}
	defer resp.Body.Close()

	// Check the response status code
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API call failed: %s", resp.Status)
	}

	// Read the response body
	fileData, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("error reading response body: %v", err)
	}

	return fileData, nil
}

// parsePublicKey parses RSA public key from bytes
func parsePublicKey(publicKeyBytes []byte) (*rsa.PublicKey, error) {
    block, _ := pem.Decode(publicKeyBytes)
    if block == nil {
        return nil, fmt.Errorf("failed to parse PEM block containing the public key")
    }

    // Attempt to parse the public key using ParsePKIXPublicKey
    publicKeyInterface, err := x509.ParsePKIXPublicKey(block.Bytes)
    if err != nil {
        return nil, fmt.Errorf("failed to parse public key: %w", err)
    }

    // Type assert the parsed public key to *rsa.PublicKey
    publicKey, ok := publicKeyInterface.(*rsa.PublicKey)
    if !ok {
        return nil, fmt.Errorf("failed to convert public key to RSA public key")
    }

    return publicKey, nil
}

func verifyFile(fileData []byte, publicKey *rsa.PublicKey) error {
	// Assign fileData to content
	content := fileData

	// Extract the hash and signature from the file's metadata
	var hash, signature []byte
	lines := strings.Split(string(content), "\n")
	for _, line := range lines {
		if strings.HasPrefix(line, "Hash:") {
			var err error
			hash, err = hex.DecodeString(strings.TrimSpace(line[len("Hash:"):]))
			if err != nil {
				return fmt.Errorf("error decoding hash: %w", err)
			}
		}
		if strings.HasPrefix(line, "SignedReference:") {
			var err error
			signature, err = base64.StdEncoding.DecodeString(strings.TrimSpace(line[len("SignedReference:"):]))
			if err != nil {
				return fmt.Errorf("error decoding signature: %w", err)
			}
		}
	}

	// Debugging: Print extracted hash and signature to verify correctness
	hashString := hex.EncodeToString(hash[:])
	fmt.Println("Extracted Hash:", hashString)

	signedReference := base64.StdEncoding.EncodeToString(signature)
	fmt.Println("Extracted Signature:", signedReference)

	// Check if both hash and signature metadata are found
	if len(hash) == 0 {
		return fmt.Errorf("hash metadata not found in file")
	}
	if len(signature) == 0 {
		return fmt.Errorf("signature metadata not found in file")
	}

	// Verify the hash against the calculated hash using the public key
	err := rsa.VerifyPKCS1v15(publicKey, crypto.SHA256, hash[:], signature)
	if err != nil {
		return fmt.Errorf("verification failed: %v")
	}
	return nil
}
