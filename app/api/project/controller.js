const { projects } = require('../../db/models');

async function store(req, res, next) {
    try {
        const { title, description, github_link, web_link, image_url } = req.body;

        const project = await projects.create({
            title,
            description,
            github_link,
            web_link,
            image_url
        })

        return res.status(201).json({
            code: 200,
            status: "OK",
            message: "Success create project",
            data: project
        });

    } catch (err) {
        next(err)
    }

}

async function update(req, res, next) {
    try {

        const { id } = req.params;
        const { title, description, github_link, web_link, image_url } = req.body;

        const checkProject = await projects.findOne({
            where: {
                id: id
            }
        });


        if (!checkProject) {
            res.status(404).json({
                code: 400,
                status: "NOT FOUND",
                message: 'Project not found',
            });
        }

        const project = await checkProject.update({
            title,
            description,
            github_link,
            web_link,
            image_url
        });

        return res.status(201).json({
            code: 200,
            status: "OK",
            message: "Success update project",
            data: project
        });

    } catch (err) {
        next(err)
    }
}

async function get(req, res, next) {

    try {

        const dataProjects = await projects.findAll({
            attributes: ['id', 'title', 'description', 'github_link', 'web_link', 'image_url']
        })

        res.status(200).json({
            code: 200,
            status: "OK",
            message: 'Success get all projects',
            data: dataProjects
        })

    } catch (err) {
        next(err)
    }

}

async function destroy(req, res, next) {
    try {

        const project = await projects.findOne({
            where: { id: req.params.id }
        });

        if (!project) {
            return res.status(404).json({
                code: 404,
                status: "NOT FOUND",
                message: "id project not found"
            });
        }

        project.destroy();

        res.status(200).json({
            code: 200,
            status: "OK",
            message: "Success delete project"
        });

    } catch (err) {
        next(err)
    }
}

module.exports = {
    store,
    update,
    get,
    destroy
}