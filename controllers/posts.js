const Post = require('../models/posts');
const BaseController = require('./base');
const User = require('../models/users');


class PostController extends BaseController{
    constructor() {
        super();
    }
    async send_post(req, res){
        super.checkReqBody(req);

        try {
            let token = req.headers.token;
            let token_data = super.verifyToken(token);
            let username = token_data.username;
            let user = await User.findOne({username});
            if (user){
                let message = req.body.message;
                Post.create({message, user: user._id}, (err, instance)=>{
                    if (err){
                        return super.sendError(res, err, err.message, err.status)
                    }
                    return super.sendSuccess(res, instance)
                })
            }
        }
        catch(err) {
            super.sendError(res, err, err.message, err.status)
        }
    }
}


module.exports = new PostController();
