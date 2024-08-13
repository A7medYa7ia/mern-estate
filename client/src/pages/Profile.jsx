import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [filePerc, setFilePerc] = useState(0);
  const [file, setFile] = useState(undefined);
  const [fielUploaderror, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

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

  return (
    <div className=" flex items-center flex-col gap-4 rounded-lg">
      <p className="text-4xl font-semibold  mt-7">Profile</p>
      <form action="" className=" flex flex-col   gap-4 w-3/4 max-w-xl">
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
        />
        <input
          type="email"
          placeholder="email"
          className="p-4 rounded-lg "
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="p-4 rounded-lg  "
          id="password"
        />
        <button className="text-white font-semibold bg-slate-700 p-4 rounded-lg hover:opacity-90">
          UPDATE
        </button>
        <button
          type="button"
          className="text-white font-semibold bg-green-700 p-4 rounded-lg hover:opacity-90"
        >
          CREATE lISTING
        </button>
      </form>
      <div className="flex justify-around mt-5 max-w-5xl w-full">
        <span className="text-red-600 font-semibold cursor-pointer">
          delete account
        </span>
        <span className="text-red-600 font-semibold cursor-pointer">
          sign out
        </span>
      </div>
    </div>
  );
}
