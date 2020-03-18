"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../Models/user.model");
const bcryptjs_1 = require("bcryptjs");
class userController {
    static addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const inserted_user = yield user_model_1.default.findOne({
                    Email: user.Email
                })
                    .then(resp => {
                    if (!resp) {
                        bcryptjs_1.default.hash(user.Password, 10, (err, hash) => {
                            user.Password = hash;
                            user_model_1.default.create(user)
                                .then(user => {
                                return user;
                            });
                        });
                    }
                    else {
                        return 'User Already Exist';
                    }
                });
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.default = userController;
