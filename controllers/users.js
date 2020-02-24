const User = require("../models/users");
const BaseController = require("../controllers/base");
const bcrypt = require("bcrypt");

class UserController extends BaseController{
    constructor() {
        super();
    }

    async create(req, res){
        super.checkReqBody(req);
        try {
            const { username, email, password, first_name, last_name } = req.body;
            const existing_user = await User.findOne({ username });
            const existing_email = await User.findOne({ email });
            if (existing_user || existing_email)
                return super.sendError(res, null, "User already exists", 200, 403);



            const user_params = { username, email, password, first_name, last_name };
            const user = new User(user_params);
            let saved_user = await user.save();
            let token_data = {userId: saved_user._id, username: saved_user.username};
            let token = super.generateToken(token_data);
            saved_user = {token, user: saved_user};
            return super.sendSuccess(res, saved_user);

        }
        catch (err) {
            return super.sendError(res, err, err.message, err.status)
        }
    }

    async login(req, res){
        super.checkReqBody(req);
        try{
            const { email, password } = req.body;
            let user = await User.findOne({ email });
            if (user){
                bcrypt.compare(password, user.password, (err, matched)=>{
                    if (err)
                        return super.sendError(res, err, err.message, err.status);
                    if (matched){
                        let token_data = { user_id: user._id, username: user.username };
                        const token = super.generateToken(token_data);
                        let data = {token, user: user};
                        return super.sendSuccess(res, data)
                    }
                    else {
                        return super.sendError(res, null, "Incorrect password", 200,400)
                    }
                })
            }
        }
        catch (e) {
            return super.sendError(res, e, e.message, e.status)
        }
    }


}


module.exports = new UserController();
