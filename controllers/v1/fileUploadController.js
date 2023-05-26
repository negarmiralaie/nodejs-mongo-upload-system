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
                // Now store these files in db
                for (const file of filesArray) {
                    await FileModel.create({
                        fileName: file.fileName,
                        filePath: file.filePath,
                        fileType: file.fileType,
                        fileSize: file.fileSize,
                    });
                }
                return res.status(200).json({
                    message: 'Files are successfully saved',
                });
            }
            return res.status(200).json({
                message: 'No file was given...',
            });
        } catch (error) {
            // console.log('error: ', error);
            throw createError.InternalServerError(error);
        }
    },
}

module.exports = uploadFileController;