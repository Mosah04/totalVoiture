import multer from "multer";

const storageAnnonce = multer.diskStorage({
  destination: (req, file, cb) => {
    const fieldname = file.fieldname;
    let folder = "uploads/";

    if (["0", "1", "2", "3"].includes(fieldname)) {
      folder += "photosVoitures";
    } else {
      folder += fieldname;
    }

    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadAnnonce = multer({ storage: storageAnnonce });

// Définir les champs à accepter par multer
const uploadAnnonceFields = [
  { name: "0", maxCount: 1 },
  { name: "1", maxCount: 1 },
  { name: "2", maxCount: 1 },
  { name: "3", maxCount: 1 },
  { name: "TVM", maxCount: 1 },
  { name: "carteGrise", maxCount: 1 },
  { name: "contratAssurance", maxCount: 1 },
  { name: "visiteTechnique", maxCount: 1 },
];
export const manageAnnonceFiles = () => {
  const setRequestBody = (req, res, next) => {
    const responseData = {
      photos: [],
      TVM: [],
      carteGrise: [],
      contratAssurance: [],
      visiteTechnique: [],
    };

    // Traiter les fichiers et construire l'objet de réponse
    for (const field in req.files) {
      if (["0", "1", "2", "3"].includes(field)) {
        req.files[field].forEach((file) => {
          responseData.photos.push(file.filename);
        });
      } else {
        responseData[field].push(req.files[field][0].filename);
      }
    }

    // Ajouter les autres champs du formulaire au body de la requête
    req.body.photos = responseData.photos;
    req.body.TVM = responseData.TVM;
    req.body.carteGrise = responseData.carteGrise;
    req.body.contratAssurance = responseData.contratAssurance;
    req.body.visiteTechnique = responseData.visiteTechnique;

    return next();
  };

  return [uploadAnnonce.fields(uploadAnnonceFields), setRequestBody];
};
