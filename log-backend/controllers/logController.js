//@desc Get all credentials
//@route GET /api/logs
//@access public 

const getLogs = (req, res) => {
    res.status(200).json({ message: "Get all credentials" });
};


//@desc Get a Credential
//@route GET /api/logs
//@access public 

const getLog = (req, res) => {
    res.status(200).json({ message: `Get credentials for ${req.params.id}`});
};

//@desc Create Credentials
//@route POST /api/logs
//@access public 

const createLogs = (req, res) => {
    console.log("The request body is: ", req.body);
    const { name, keyName, trustPolicy } = req.body;
    if (!name || !keyName || !trustPolicy) {
        return res.status(400);
        throw new Error("Please provide all the required fields");
    }
    res.status(200).json({ message: "Create credentials" });
};

//@desc Update a Credential
//@route PUT /api/logs
//@access public 

const updateLogs = (req, res) => {
    res.status(200).json({ message: `Update credentials for ${req.params.id}` });
};

//@desc Delete a Credential
//@route DELETE /api/logs
//@access public 

const deleteLogs = (req, res) => {
    res.status(200).json({ message: `Delete credentials for ${req.params.id}` });
};


module.exports = {getLogs, getLog, createLogs, updateLogs, deleteLogs};