import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  logOutFailure,
  logOutStart,
  logOutSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/userSlice";
import { Link } from "react-router-dom";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [filePerc, setFilePerc] = useState(0);
  const [file, setFile] = useState(undefined);
  const [fielUploaderror, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch((state) => state.user);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handlechange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = (await res).json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignOut = async () => {
    try {
      dispatch(logOutStart());

      const res = await fetch("/api/auth/sign-out");
      const data = res.json();
      if (data.success === false) {
        dispatch(logOutFailure(data.message));
        return;
      }
      dispatch(logOutSuccess(data));
    } catch (error) {
      dispatch(logOutFailure(error.message));
    }
  };
  return (
    <div className=" flex items-center flex-col gap-4 rounded-lg">
      <p className="text-4xl font-semibold  mt-7">Profile</p>
      <form
        action=""
        onSubmit={handleSubmit}
        className=" flex flex-col   gap-4 w-3/4 max-w-xl"
      >
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          hidden
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          src={formData.avatar || currentUser.avatar}
          alt=""
          className="rounded-full self-center size-44"
          onClick={() => {
            fileRef.current.click();
          }}
        />
        {fielUploaderror ? (
          <span className="text-red-600 text-center">ErrorImage upload</span>
        ) : filePerc > 0 && filePerc < 100 ? (
          <span className="text-slate-600 text-center">{`uploading ${filePerc}`}</span>
        ) : filePerc === 100 ? (
          <span className="text-green-600 text-center">
            successfully uploaded
          </span>
        ) : (
          <span></span>
        )}

        <input
          type="text"
          placeholder="userName"
          className="p-4 rounded-lg "
          id="username"
          defaultValue={currentUser.username}
          onChange={handlechange}
        />
        <input
          type="email"
          placeholder="email"
          className="p-4 rounded-lg "
          id="email"
          defaultValue={currentUser.email}
          onChange={handlechange}
        />
        <input
          type="password"
          placeholder="password"
          className="p-4 rounded-lg  "
          id="password"
          onChange={handlechange}
        />
        <button className="text-white font-semibold bg-slate-700 p-4 rounded-lg hover:opacity-90">
          UPDATE
        </button>
        <Link
          to={"/create-listing"}
          className="text-white text-center font-semibold bg-green-700 p-4 rounded-lg hover:opacity-90"
        >
          CREATE lISTING
        </Link>
      </form>
      <div className="flex justify-around mt-5 max-w-5xl w-full">
        <span
          onClick={handleDelete}
          className="text-red-600 font-semibold cursor-pointer"
        >
          delete account
        </span>
        <span
          onClick={handleSignOut}
          className="text-red-600 font-semibold cursor-pointer"
        >
          sign out
        </span>
      </div>
    </div>
  );
}
