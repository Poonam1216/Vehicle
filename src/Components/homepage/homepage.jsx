import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../homepage/home.css'

const LandingPage = () => {

    const [allBrandList, setAllBrandList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchType, setSearchType] = useState("");
    const [ownerDetail, setOwner] = useState({});
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleOwner = (owner) => {
        setOwner(owner);
        handleShow();
    };

    useEffect(() => {
        let url = "https://vpic.nhtsa.dot.gov/api/vehicles/getmanufacturerdetails/honda?format=json";

        if (searchText) {
            url = `https://vpic.nhtsa.dot.gov/api/vehicles/getmanufacturerdetails/${searchText}?format=json`;
        }

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setAllBrandList([...data.Results]);
                if (searchType) {
                    let filteredData = allBrandList.filter((item) => item?.VehicleTypes?.[0]?.Name === searchType);
                    setAllBrandList(filteredData);
                }

            })
            .catch((error) => console.error(error));
    }, [searchText, searchType]);

    // console.log(filteredData)
    return (
        <>
            <header>
                <h1>VEHICLE MANUFACTURERS</h1>
            </header>
            <section className="landing-page-section">
                <div className="search-container">
                    <div className="search">
                        <label htmlFor="searchByName">Search by Name</label>
                        <input type="text" name="search" id="search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="searchByType">Search by Type</label>
                        <select className="search" id="searchByType" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                            <option value="">All</option>
                            <option value="Motorcycle">Motorcycle</option>
                            <option value="LMV">LMV</option>
                            <option value="Passenger Car">Passenger Car</option>
                            <option value="Bus">Bus</option>
                            <option value="Truck">Truck</option>
                        </select>
                    </div>
                </div>

                <div className="title-name-box">
                    <div className="car-name">Name</div>
                    <div className="country-name">Country</div>
                    <div className="type-name">Type</div>
                </div>

                {allBrandList.map((item, i) => {
                    return (
                        <>
                            {item.Mfr_CommonName && item.Country && item.VehicleTypes[0]?.Name &&
                                <div className="title-name-box" key={i} onClick={() => handleOwner(item)}>
                                    <div className="car-name">{item.Mfr_CommonName}</div>
                                    <div className="country-name">{item.Country}</div>
                                    <div className="type-name">{item?.VehicleTypes[0]?.Name}</div>
                                </div>
                            }
                        </>
                    )
                })}

                <div>
                    <Modal className="popup-container" show={show} onHide={handleClose} centered>
                        <Modal.Body className="modal-body">{ownerDetail.Country}
                            <div className="ownerDetail-name">{ownerDetail.Mfr_Name}</div>
                            <div className="owner-Ceo">{ownerDetail.PrincipalPositio}</div>
                            <div className="owner-Address">{ownerDetail.Address}</div>
                        </Modal.Body>
                        <Modal.Footer className="footer">
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>


            </section>


        </>
    )
}

export default LandingPage;