import { useState } from "react";

function DemoImg() {
  const [file, setFile] = useState();

  const handleUpload = (e) => {
    console.log(file);
    // Perform the upload logic here
  };

  return (
    
    <div>
       <h1></h1><br></br><br></br><br></br>
            <h1></h1><br></br><br></br>
            <h1></h1><br></br><br></br>
            <h1></h1><br></br><br></br>
            <h1></h1><br></br><br></br>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default DemoImg;
