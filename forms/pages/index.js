import { useEffect, useState } from "react";
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import axios from "axios";
export default function Home() {

  const [data, setData] = useState([]);
  const [user, setUser] = useState({
    name: "",
    dob: "",
    country: "",
    resume: ""
  })
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState('');
  const [viewPdf, setViewPdf] = useState(null);



  const [suggestion, setSuggestion] = useState([])
  const [display, setDisplay] = useState(false);
  const api_url = 'http://localhost:8000/country'
  useEffect(() => {
    async function getCountry() {
      const response = await fetch(api_url);
      var doc = await response.json();
      setData(doc);
    }
    getCountry();
  }, [])
  const fileType = ['application/pdf'];
  function change(e) {

    if (e.target.name === "resume") {
      var files = e.target.files[0];
      if (files) {
        if (files && fileType.includes(files.type)) {
          let reader = new FileReader();
          reader.readAsDataURL(files);
          reader.onloadend = (e) => {
            setPdfFile(e.target.result);
            setPdfFileError('')
          }
        } else {
          setPdfFile(null);
          setPdfFileError('please select valid pdf file')
        }
      } else {
        console.log('select your file');
      }
      value = (setPdfFile);
    }
    if (e.target.name === "country")
      Autocomplete(e.target.value)
    var value = e.target.value
    setUser((prv) => ({ ...prv, [e.target.name]: value }))

  }

  function save(e) {
    e.preventDefault()
    console.log(user);
    // axios({
    //   method: "post",
    //   url: "http://localhost:8000/",
    //   data: user,
    //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
    // })
    //   .then(function (response) {
    //     //handle success
    //     console.log(response);
    //   })
    //   .catch(function (response) {
    //     //handle error
    //     console.log(response);
    //   });
    axios.post("http://localhost:8000/", user)
  }


  function Autocomplete(e) {
    const text = e;
    let matches = []
    if (text.length > 0) {
      setDisplay(true)
      matches = data.filter(val => {
        const regex = new RegExp(`${text}`, "gi");
        return val.name.match(regex);
      })
    } else {
      setDisplay(false);
    }

    setSuggestion(matches);
  }
  function setValue(val) {
    setDisplay(false);
    setUser((prv) => ({ ...prv, country: val.name }))
  }

  return (
    <div className={styles.container}>
      <nav className='navbar' >
        <Link href='/'><h2 className="navhead">Home</h2></Link>
        <Link href='/lists'> <h2 className="navhead">List</h2></Link>
      </nav>
      <form >
        <fieldset className='formX'>
          <legend><h1>Basic Form</h1></legend>
          <label>Name:</label>
          <input type='text' placeholder='Enter your name' onChange={change} name="name" value={user.name} />
          <label>Date Of Birth:</label>
          <input type='date' onChange={change} name="dob" value={user.date} />
          <label>Country Name:</label>
          <input type='text' onChange={change} name="country" placeholder="Enter your country name" value={user.country} />
          <label>Upload resume</label>
          <input type='file' onChange={change} name="resume" />
          <button onClick={save}>Register</button>
        </fieldset>
      </form>
      {display ? <div className="auto">
        {
          suggestion.length ? suggestion.map((val, id) => <h3 key={id} onClick={() => setValue(val)}>{val.name}</h3>) : <div className="invalid">{"Invalid Country Name"}</div>
        }
      </div> : null
      }
    </div >
  )
}
