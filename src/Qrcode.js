import { useState } from "react";
import "./Qr.css";

export default function Qrcode() {
   
    // const [img,setImg]=useState("images/logo.png") 
    const [img,setImg]=useState("") ;
    const [loading,setLoading]=useState(false);
    
    const [qrdata,setQrdata] = useState("");
    const [qrsize,setQrsize] = useState("");

   async function generate(){
    if(qrdata != "" && qrsize != "")
    {
      setLoading(true);
      try{
        
        const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`;
        setImg(url);
      } catch(error){
        console.error("error generating QR code", error)
      }
        finally{
            setLoading(false);
        }
      
    }else{
        alert("please enter data first !!!");
    }
}
    function download(){
      if (img != "")
         fetch(img).then( (res)=>res.blob()).then((blob)=>{
            const link=document.createElement("a");
            link.href= URL.createObjectURL(blob);
            link.download="qrcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
         }).catch((error)=>{
            console.error("fetch error while downloading qr code",error);
         })
    }
  return (
   
    <div>
      <div className="app-container">
        <h1>QR code generator</h1>
        <div className="background-img">
        {loading && <p>please wait..</p>}

        { img && <img className="qr-code-image" src={img} /> } 
      
        </div>
        <div>
        <label htmlFor="datainput" className="input-label" >
          data for qr code :{" "}
        </label>

        <input
          type="text"
          id="datainput"
          placeholder="enter data for qr code"
          value={qrdata}  onChange={ (e)=>setQrdata(e.target.value)}
        />
        <label htmlFor="sizeinput" className="input-label">
          image size (e.g., 150) :
        </label>

        <input type="text" id="sizeinput" placeholder="enter size of image"   value={qrsize}  onChange={ (e)=>setQrsize(e.target.value)}/>
     
     <div className="buttons">
        <button className="generate" disabled={loading} onClick = {generate}> Generate QR code</button>
        <button className="download" onClick={download}>Download QR code</button>
      </div>
      </div>

      <p>Designed by <a href="https://gopinath-portfilo.vercel.app">gopinath</a></p>
      </div>
      
      </div>
  
  );
}
