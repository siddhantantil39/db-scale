const {Op} = require('sequelize');
const User = require('../models/user.model');

class UserService{
    
    async createUser(user){
        try {
            if(!user.email || !user.firstName || !user.lastName){
                throw new Error("Validation failed for the user");
            }

            const newUser = await User.create(user, {
                firstName : user.firstName,
                lastName : user.lastName,
                email : user.email,
                age : user.age,
                isActive: user.isActive
            });

            console.log('New User created:', newUser.toJSON());
            return user;
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    async getUserById(id) {
        try {
          const user = await User.findByPk(id);

          if (!user) {
            throw new Error('User not found');
          }

          return user;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }

};

module.exports = new UserService();