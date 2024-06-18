import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Admin from '../models/adminModel.js';


const loginadmin = async(req, res)=> {
  const { username, password } = req.body;
  try {
      const admin = await Admin.findOne({ username });

      if (!admin) {
          return res.json({ success: false, message: "User Doesn't exist" })
      }

      const isMatch = await bcrypt.compare(password, admin.password)

      if (!isMatch) {
          return res.json({ success: false, message: "Invalid Credentials" })
      }

      const token = createTokenid(admin.username);
      
      // Check if the admin's role is 'Admin'
      if (admin.role === 'Admin') {
        const role = createTokenid(admin.role); 
        return res.json({ success: true, token, role });
      }

      res.json({ success: true, token });

  } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" })
  }
};

const createTokenid = (id) => {
  try {
    return jwt.sign({ id }, process.env.JWT_SECRET);
  } catch (error) {
    console.error('Error creating token:', error);
    return null;
  }
};


  const getallAdmins = async (req,res) => {
      try {
        const admins = await Admin.find({});
        res.json(admins);
      } catch (error) {
        
      }
  };
   
  
  const createAdmin= async(req, res) => {
    const { username, password, role } = req.body;

    // Check if an admin with the same username already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'An admin with this username already exists' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const admin = new Admin({ username, password: hashedPassword,role });

    try {
      // Save the admin to the database
      await admin.save();
      res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error creating admin' });
    }
  }
const deleteAdmin = async (req, res) => {
    try {
      const admin = await Admin.findByIdAndDelete(req.params.id);
  
      if (!admin) {
        return res.status(404).json({ success: false, message: 'Admin not found' });
      }
  
    
  
      res.json({ success: true, message: 'Admin deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };



export  {loginadmin, createAdmin, getallAdmins, deleteAdmin} ;
