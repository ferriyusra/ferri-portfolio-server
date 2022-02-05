const { projects } = require('../../db/models');
const fs = require('fs');
const path = require('path');

async function store(req, res, next) {
    try {
        // const { title, description, github_link, web_link, image_url } = req.body;
        let payload = req.body;

        if (req.file) {
            let tmp_path = req.file.path;
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originalExt;
            let target_path = path.resolve(__dirname, '..', `public/upload/${filename}`);

            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
            src.pipe(dest);

            src.on('end', async () => {
                try {
                    let project = new projects({ ...payload, image_url: filename })
                    await project.save()
                    return res.status(201).json({
                        code: 200,
                        status: "OK",
                        message: "Success create project",
                        data: project
                    });
                } catch (err) {
                    fs.unlinkSync(target_path);
                    next(err)
                }
            });
            src.on('error', async () => {
                next(err);
            });

        } else {
            let project = new projects(payload);
            await project.save();
            return res.status(201).json({
                code: 200,
                status: "OK",
                message: "Success create project",
                data: project
            });
        }

    } catch (err) {
        next(err)
    }

}

module.exports = {
    store
}



        // const project = await projects.create({
        //     title,
        //     description,
        //     github_link,
        //     web_link,
        //     image_url
        // })

        // return res.status(201).json({
        //     code: 200,
        //     status: "OK",
        //     message: "Success create project",
        //     data: project
        // });