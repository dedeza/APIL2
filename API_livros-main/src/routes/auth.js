const express = require('express');
const router = express.Router();
const jwtVerify = require('../middlaware/JWTVerify');
const livrosController = require('../controllers/livrosController');
const mensagensController = require('../controllers/mensagensController');
const userController = require('../controllers/userController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads/')
    },
    filename: function (req, file, cb){
        let data = new Date().toISOString().replace(/:/g, '-') + '-';
        cb(null, data + file.originalname)
    }
})
const fileFilter = (req, file, cb )=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ){
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
});

router.post('/livros/create', jwtVerify, upload.single('livro_image'), livrosController.create);
router.get('/livros/meus-livros',jwtVerify, livrosController.myRead);
router.get('/livros/delete/:livro_id',jwtVerify, livrosController.delete);
router.post('/livros/update/:livro_id',jwtVerify, livrosController.update);
router.get('/livros/isReservado/:livro_id/:is_reservado',jwtVerify, livrosController.IsReservado);


router.post('/mensagem/create/:livro_id', jwtVerify, mensagensController.create);
router.get('/mensagem/delete/:mensagem_id', jwtVerify, mensagensController.delete);
router.post('/mensagem/update/:mensagem_id', jwtVerify, upload.single('livro_image'), mensagensController.update);
router.get('/mensagem/my-mensagens', jwtVerify, mensagensController.myMensagens);

router.get('/perfil', jwtVerify, userController.perfil);

module.exports = router;