class admController { 
    index = async (req, res) => {
        res.render('ADM/index');
    };

}

export default new admController()