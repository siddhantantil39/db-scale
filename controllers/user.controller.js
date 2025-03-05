const UserService = require('../services/user.service');

class UserController {
    async createUser(req, res){
        try {
            const {firstName, lastName, email, age} = req.body;

            if(!firstName || !lastName || !email){
                return res.status(400).json({
                    error: "Input validation failed"
                });
            };

            const user = await UserService.createUser({
                firstName,
                lastName,
                email,
                age
            });

            res.status(201).json({
                message: "User created successfully",
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    email: user.email
                }
            });
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({ 
                  error: 'User with this email already exists' 
                });
            }

            res.status(500).json({ 
                error: 'Failed to create user',
                details: error.message 
            });
        }

    }

    async getUserById(req, res){
        try {
            const userId = req.params.id;

            if(!userId || isNaN(userId)){
                return res.status(400).json({
                    error: "Invalid user ID"
                })
            };

            const user = await UserService.getUserById(userId);

            res.status(200).json({
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    age: user.age,
                    isActive : user.isActive 
                }
            })
        } catch (error) {
            if (error.message === 'User not found') {
                return res.status(404).json({ 
                  error: 'User not found' 
                });
              }
        
              res.status(500).json({ 
                error: 'Failed to retrieve user',
                details: error.message 
              });
        }
    }
};

module.exports = new UserController();