const FileModel = require('../../models/File');
const {multipleFileUpload} = require('../../components/uploadFIle');
const createError = require('http-errors');

const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];
}; 

const uploadFileController = {
    create: async (req, res) => {
        try {
            // Bc of our upload middleware, now we have access to req.files
            const files = req.files;
            console.log('files: ', files);
            if (files) {
                const filesArray = await multipleFileUpload(files);
                console.log('filesArray: ', filesArray);
                // Now store these files in db
                // const createdFile = await FileModel.insertMany(filesArray);
                for (const file of filesArray) {
                // console.log('file', file);
                console.log('hey1');
                // const createdFile = await FileModel.create(file);
                const createdFile = await FileModel.create({
                    fileName: file.fileName,
                    filePath: file.filePath,
                    fileType: file.filePath,
                    fileSize: file.fileSize,
                });
                console.log('hey2');
                console.log('createdFile', createdFile);
                }
                return res.status(200).json({
                    message: 'Files are successfully saved',
                    // createdFile,
                });
            }
            return res.status(200).json({
                message: 'No file was given...',
            });
        } catch (error) {
            console.log('error: ', error);
            throw createError.InternalServerError(error);
        }
    },
}

module.exports = uploadFileController;