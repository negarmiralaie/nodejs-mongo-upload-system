const multipleFileUpload = async (files) => {
    try{
        const filesArray = [];
        await files.forEach(element => {
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
                fileSize: element.size,
            }
            filesArray.push(file);
        });
        return filesArray;
    }catch(error) {
        return error;
    }
}

module.exports = { multipleFileUpload };