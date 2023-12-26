import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/blog");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 10000000 },
});
export default upload;
// MULTER 2


const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/products");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});


const multerFilter2 = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

const upload2 = multer({
  storage: storage2,  // Corrected this line
  fileFilter: multerFilter2,
  limits: { fileSize: 10000000 },
});

export { upload2 };
