import userModel from "./models/user.model.js"

class UserManager {
    constructor() {
        this.userModel = userModel
    }

    async getAll() {
        return await this.userModel.find()
    }

    async getByEmail(email) {
        return await this.userModel.findOne({ email })
    }

    async create(data) {
        return await this.userModel.create(data)
    }

    async updateByEmail(email, data, config) {
        return await this.userModel.findOneAndUpdate(
            { email },
            data,
            { new: true, ...config }
        )
    }

    async deleteByEmail(email) {
        return await this.userModel.findOneAndDelete({ email })
    }
}

const userManager = new UserManager()
export default userManager
