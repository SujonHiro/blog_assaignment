import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
//import {toast,ToastContainer} from "react-toastify";


const CreateUpdateForm = () => {
    let {id}=useParams()
    let [formValue,setFromValue]=useState({title:"",img:"",Description:"",CreatorName:""})
    const navigate=useNavigate()

        let [isTitle,setIsTitle]=useState(false)
    let [isAuthor,SetisAuthor]=useState(false)
    useEffect(()=>{
        (async ()=>{
            let res= await axios.get("https://blogsdev.onrender.com/api/v1/readBlogById/"+id)
            setFromValue(res.data['data'][0]);
            setIsTitle(true)
            SetisAuthor(true)
        })()
    },[])
    const inputChange=(property,value)=>{
        setFromValue({...formValue,[property]:value})
    }

      const onsubmit= async ()=>{
          let URI="https://blogsdev.onrender.com/api/v1/create"
          if(id){
               URI="https://blogsdev.onrender.com/api/v1/update/"+id;
          }
       let res= await axios.post(URI,formValue)
          if(res.status===200){
              /*toast.success('Save Changes', {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
              });*/
              alert("save changes Successfully")
              navigate("/")
          }
      }
    return (
        <div>

            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-8 mt-5">
                        <div className="card ">
                            <h1 className="card-header text-center">Create Form</h1>
                            <div className="col-12 p-5">
                                <div className="mb-3">
                                    <label  className="form-label">Title</label>
                                    <input disabled={isTitle} value={formValue.title} onChange={(e)=>{inputChange('title',e.target.value)}} type="text" className="form-control" placeholder="Title Name"/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Images</label>
                                    <input value={formValue.img} onChange={(e)=>{inputChange('img',e.target.value)}} type="text" className="form-control" placeholder="Image Sources"/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Author Name</label>
                                    <input disabled={isAuthor} value={formValue.CreatorName} onChange={(e)=>{inputChange('CreatorName',e.target.value)}} type="text" className="form-control" placeholder="Author Name"/>
                                </div>

                                <div className="mb-3">
                                    <label  className="form-label">
                                        Description
                                    </label>
                                    <textarea value={formValue.Description} onChange={(e)=>{inputChange('Description',e.target.value)}} className="form-control" rows={3} defaultValue={""}/>
                                </div>
                                <div className="mb-3 d-flex justify-content-center">
                                    <button onClick={onsubmit} className="btn btn-outline-primary w-50">Submit</button>
                                    {/*<ToastContainer />*/}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateUpdateForm;