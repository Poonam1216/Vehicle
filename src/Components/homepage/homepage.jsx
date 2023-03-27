import React from 'react'
import { useEffect, useState} from 'react';
import '../homepage/home.css';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const Homepage = () => {
    const [list, setList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchType , setSearchType] = useState("");
    const [ownerDetail , setOwnerDetail] = useState({});
    const [show, setShow] = useState(false)
   


    const handleChange = ()=> setShow(false);
    const handleShow = ()=> setShow(true);

    const handleOwn = (owner)=>{
        setOwnerDetail(owner);
        handleShow();
    }
    useEffect(()=>{
         let API = 'https://vpic.nhtsa.dot.gov/api/vehicles/getmanufacturerdetails/honda?format=json';

         if(searchText){
            API = `https://vpic.nhtsa.dot.gov/api/vehicles/getmanufacturerdetails/${searchText}honda?format=json`
         }

        fetch(API).then(response => response.json()).then(data =>{
            setList([...data.Results]);
            if(searchType){
                let filter = list.filter((item)=>item?.VehicleType?.[0]?.Name === searchType);
                setList(filter);
            }
        }).catch(error =>{
            console.error(error);
        })
    }, [searchText, searchType]);

  return (
    <>
      <h1 className='heading'>Vehicle Manufacturer Catalog</h1>
       <section className='home'>
        <div className='search-bar1'>
            <div className='search'>
                <label htmlFor="searchByName">Search By Name</label>
                <input type="text" name="search" id="search" value={searchText} onChange={(e)=>setSearchText(e.target.value)} />

            </div>
            <div className='search-bar2'>
                <label htmlFor="searchBytype" >Search By Type</label>
                <select className="searchType" id="searchType" value={searchType} onChange={(e)=>setSearchType(e.target.value)}> 
                    <option value="">All</option>
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="LMV">LMV</option>
                    <option value="Passenger">Passenger</option>
                    <option value="Bus">Bus</option>
                    <option value="Truck">Truck</option>
                </select>
            </div>
        </div>


        <div className='context'>
            <div className='car'>Name</div>
            <div className='country'>Country</div>
            <div className='type'>Type</div>
        </div>

        {
            list.map((item, i)=>{
                return(
                    <>
                        {item.Mfr_CommonName && item.Country && item.VehicleTypes[0]?.Name &&
                            <div className='data-box' key={i} onClick={()=> handleOwn(item)}>
                                <div className='car'>{item.Mfr_CommonName}</div>
                                <div className='country'>{item.Country}</div>
                                <div className='type'>{item.VehicleTypes[0]?.Name}</div>
                            </div>
                        }
                    
                    </>
                )
            })
        }


        <div>
            <Modal className="popup" show={show} onHide={handleChange} centered>
                <Modal.Body className="body">{ownerDetail.Country}
                    <div className='ownerDetail'>{ownerDetail.Mfr_Name}</div>
                    <div className='owner-ceo'>{ownerDetail.PricipalPositio}</div>
                    <div className='address'>{ownerDetail.Address}</div>
                </Modal.Body>
                <Modal.Footer className="foote">
                    <Button onClick={()=>handleChange()} variant="secondary">Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
       </section>
     
    </>
  )
}

export default Homepage;
