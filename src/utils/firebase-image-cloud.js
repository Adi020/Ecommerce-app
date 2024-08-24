const {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require('./firebase');
const crypto = require('node:crypto');

class UploadFile {
  // Método para subir un solo archivo
  static async uploadToFirebase(path, file) {
    const imgRef = ref(
      storage,
      `${path}/${crypto.randomUUID()}-${file.originalname}`
    );
    await uploadBytes(imgRef, file.buffer);
    return await getDownloadURL(imgRef);
  }

  // Método para subir múltiples archivos
  static async uploadMultipleFilesToFirebase(path, filesData) {
    const uploadPromises = filesData.map(async ({ originalname, buffer }) => {
      const filePath = `${path}/${crypto.randomUUID()}-${originalname}`;
      const fileRef = ref(storage, filePath);
      await uploadBytes(fileRef, buffer);
      return getDownloadURL(fileRef);
    });

    const downloadURLs = await Promise.all(uploadPromises);
    return downloadURLs;
  }

  // Método para eliminar un solo archivo
  static async deleteToFirebase(path) {
    const userImgRef = ref(storage, path);
    deleteObject(userImgRef);
  }
}

module.exports = { UploadFile };
