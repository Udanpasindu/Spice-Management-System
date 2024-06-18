import userModel from '../models/UserModel.js';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User Doesn't exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" })
        }

        const token = createToken(user._id);
        res.json({ success: true,message:`${token}`, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

//register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        //checking if user already registered
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "User Already Registered" })
        }

        //validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        //validating password format
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({ success: true, token })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}
const getUserProfile = async (req, res) => {
    try {
        // Extract the token from the Authorization header
        const token = req.headers.authorization;

        // Verify the token and extract the user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Fetch the user from the database using the user ID
        const user = await userModel.findById(userId);

        // Return user profile data
        res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching user profile" });
    }

};
const updateUsername = async (req, res) => {
    const { userId, newUsername } = req.body;

    try {
        await userModel.findByIdAndUpdate(userId, { name: newUsername });

        res.json({ message: 'Username updated' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating username' });
    }
}
const updateEmail = async (req, res) => {
    const { userId, newEmail } = req.body;

    try {
        await userModel.findByIdAndUpdate(userId, { email: newEmail });

        res.json({ message: 'Email updated' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating email' });
    }
}
const updatePassword = async(req, res) => {
    const { userId, oldPassword, newPassword } = req.body;

    try {
      const user = await userModel.findById(userId);

      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Old password is incorrect' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await userModel.findByIdAndUpdate(userId, { password: hashedPassword });

      res.json({ message: 'Password updated' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating password' });
    }
  }






export { loginUser, registerUser, getUserProfile, updateUsername, updateEmail, updatePassword }