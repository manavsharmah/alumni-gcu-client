import React from 'react';
import { useUser } from "../../services/UserContext";

const Profile = () => {
  const { user } = useUser();

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Biography:</strong> {user.biography}</p>
          <p><strong>Current Working Place:</strong> {user.currentWorkingPlace}</p>
          <p><strong>Batch:</strong> {user.batch}</p>
          <a href="/update-profile">
            <button className="button">Update Profile</button>
          </a>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
