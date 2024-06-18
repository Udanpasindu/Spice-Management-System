import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import './profile.css'
import { assets } from "../../assets/frontend_assets/assets";

const UserProfile = () => {
  const { userId, token } = useContext(StoreContext); // access the userId and token from context
  const [userDetails, setUserDetails] = useState({});
  const [editMode, setEditMode] = useState({ name: false, email: false, password: false });
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/user/getuser', {
          headers: {
            Authorization: token,
          },
        });
        setUserDetails(response.data.user);
        setNewName(response.data.user.name);
        setNewEmail(response.data.user.email);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId, token]);

  const handleEdit = (field) => {
    setEditMode({ ...editMode, [field]: true });
  };

  const handleSave = async (field) => {
    // Update user details on server
    if (field === "name") {
      await axios.post('http://localhost:4000/api/user/updateUsername', { userId, newUsername: newName }, {
        headers: {
          Authorization: token,
        },
      });
    } else if (field === "email") {
      await axios.post('http://localhost:4000/api/user/updateEmail', { userId, newEmail }, {
        headers: {
          Authorization: token,
        },
      });
    } else if (field === "password") {
      if (newPassword !== confirmPassword) {
        alert("New password and confirm password do not match");
        return;
      }

      await axios.post('http://localhost:4000/api/user/updatePassword', { userId, oldPassword, newPassword }, {
        headers: {
          Authorization: token,
        },
      });

    }

    // Re-fetch user details
    const response = await axios.get('http://localhost:4000/api/user/getuser', {
      headers: {
        Authorization: token,
      },
    });
    setUserDetails(response.data.user);

    // Exit edit mode
    setEditMode({ ...editMode, [field]: false });
  };

  return (
   <div className="container-cusprofile">
    
     <div className='cusprofile'>
     

      <div className="cusdetails">
      <h1>User Profile</h1>
        <div className="cusprofileimage">
          <img src={assets.profile} alt="" width={250} />
        </div>
        <div className="abc">
          <table className='custable'>
            <tbody>
              <tr >
                <td className='tdtitle'>User ID:</td>
                <td className='tddata'>{userId}</td>
                <td></td>
              </tr>
              <tr>
                <td>Username:</td>
                <td>
                  {editMode.name ? (
                    <>
                      <input className="input-cus" type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
                      <button className='action-but' onClick={() => handleSave("name")}>Save</button>
                    </>
                  ) : (
                    <>
                      {userDetails.name}
                    </>
                  )}
                </td>
                <td>
                  {editMode.name ? null : (
                    <img src={assets.edtqbtn} alt="" width={40} onClick={() => handleEdit("name")} />
                  )}
                </td>
              </tr>
              <tr>
                <td >Email:</td>
                <td>
                  {editMode.email ? (
                    <>
                      <input className="input-cus" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                      <button className='action-but' onClick={() => handleSave("email")}>Save</button>
                    </>
                  ) : (
                    <>
                      {userDetails.email}
                    </>
                  )}
                </td>
                <td>
                  {editMode.email ? null : (
                    <img src={assets.edtqbtn} alt="" width={40} onClick={() => handleEdit("email")} />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          {editMode.password ? (
            <>
              <div className="passwordLayout">
                <input className='input-cus-pass' type="password" placeholder="Old password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} /> <br />
                <input className='input-cus-pass' type="password" placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /><br />
                <input className='input-cus-pass' type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /><br />
                <div className="but-arr">
                  <button className='action-but-pass' onClick={() => handleSave("password")}>Save</button>
                  <button className='action-but-pass' onClick={() => setEditMode({ ...editMode, password: false })}>Cancel</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <button className='rst-btn' onClick={() => handleEdit("password")}>Reset Password</button>
            </>
          )}
        </div>
      </div>
    </div>
   </div>
  );
}
export default UserProfile;
