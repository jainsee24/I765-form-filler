import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';


import './FormPage.css';
//import { countries } from "countries-list";
// import './Form.css';
// import { useParams } from 'react-router-dom';

function FormPage( ) {
    // const { username } = useParams();
    const [formData, setFormData] = useState({
        //Reason for applying
        username:'',
        initialPermission: false,
        replacement: false,
        renewal: false,
        familyName: '',
        givenName: '',
        middleName: '',
        //Other names used
        otherNames_familyName_1: '',
        otherNames_givenName_1: '',
        otherNames_middleName_1: '',
        otherNames_familyName_2: '',
        otherNames_givenName_2: '',
        otherNames_middleName_2: '',
        otherNames_familyName_3: '',
        otherNames_givenName_3: '',
        otherNames_middleName_3: '',
        inCareOfName: '',
        streetNumberName: '',
        aptSteFlr: '',
        cityOrTown: '',
        state: '',
        zipCode: '',
        isPhysicalSameAsMailing: true,
        physicalStreetNumberName: '',
        physicalAptSteFlr: '',
        physicalCityOrTown: '',
        physicalState: '',
        physicalZipCode: '',
        alienRegistrationNumber: '',
        uscisAccountNumber: '',
        hasPreviouslyFiledI765: '',
        hasSSACard: '',
        ssn: '',
        wantsSSACard: '',
        consentForSSADisclosure: '',
        fatherFamilyName: '',
        fatherGivenName: '',
        motherFamilyName: '',
        motherGivenName: '',
        countriesOfCitizenship1: '',
        countriesOfCitizenship2: '',
        dateOfBirth: '',
        countryOfBirth: '',
        cityOfBirth: '',
        stateProvinceOfBirth: '',
        immigrationStatusAtArrival: '',
        currentImmigrationStatus: '',
        sevisNumber: '',
        employerNameEVerify: '',
        employerEVerifyID: '',
        eligibilityCategory: '',
        travelDocumentNumber: '',
        formI94Number: '',
        placeOfLastArrival: '',
        dateOfLastArrival: '',
        countryOfPassport: '',
        passportExpirationDate: '',
        passportNumber: '',
        stemOptCategory: '',
        arrestedOrConvicted_1: false,
        arrestedOrConvicted_2: false,
        specialFilingInstructions: '',
        employmentBasedCategories: '',
        uscisOnlineAccountNumber: '',
        gender: '',
        maritalStatus: '',
        degree: '',
        h1bSpouseI797ReceiptNumber: '',
        i140ReceiptNumber: '',
    });
    const location = useLocation();
    const userDetails = location.state?.userDetails;

    console.log(userDetails);

    useEffect(() => {
        // Prefill form data if userDetails are provided and familyName is not empty
        if (userDetails && userDetails.familyName) {
            setFormData(userDetails);
        }
    }, [userDetails]);

    const handleInputChange = (event) => {
        console.log(formData);
      const { name, value, type, checked } = event.target;
  
      if (type === 'checkbox') {
          setFormData((prevFormData) => ({
              ...prevFormData,
              applicationType: {
                  ...prevFormData.applicationType,
                  [name]: checked,
              },
          }));
      } else {
          setFormData((prevFormData) => ({
              ...prevFormData,
              [name]: value,
          }));
      }
  };


        const handleApplicationTypeChange = (event) => {
            const { name, checked } = event.target;

            // Set all application types to false, then set the clicked one according to its current state
            setFormData((prevFormData) => ({
                ...prevFormData,
                initialPermission: false,
                replacement: false,
                renewal: false,
                [name]: checked,
            }));
        };

    const handleRadioChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value === 'Yes' ? true : false
        }));
    };
    
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: checked,
        }));
    };
    const validateForm = () => {
        if (!formData.familyName || !formData.givenName || !formData.dateOfBirth || !formData.countryOfBirth) {
            alert('Please fill in all required fields.');
            return false;
        }
        return true;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            console.log('Form data:', formData);

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userDetails: formData }), // Adjust according to your API requirements
            };

            fetch('http://18.223.122.141:8000/api/user/fill-detail/', requestOptions)
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('There was an error!', error));
        }
    };


    const CountryDropdown = () => (
      <select name="countryOfBirth" value={formData.countryOfBirth} onChange={handleInputChange} required className="form-control">
          <option value="">Select Country</option>
          <option value="India">India</option>
          <option value="China">China</option>
          <option value="Russia">Russia</option>
          <option value="Australia">Australia</option>
          <option value="Korea">Korea</option>
          <option value="Japan">Japan</option>
          {/* More Country options can be added or the countries-list package can be used */}
      </select>
    );

    // const CountryDropdown = ({ value, onChange }) => {
    //     return (
    //         <select name="countryOfBirth" value={value} onChange={onChange} required className="form-control">
    //             <option value="">Select Country</option>
    //             {Object.keys(countries).map((code) => (
    //                 <option key={code} value={code}>
    //                     {countries[code].name}
    //                 </option>
    //             ))}
    //         </select>
    //     );
    // };

    return (
      <div className="form-container">
          <form onSubmit={handleSubmit}>
              <h1 className="form-title">Form I-765 - Application For Employment Authorization</h1>
              
              {/* Type of Application */}
                <div className="form-group">
                    <label>Part 1. Reason for Applying</label>
                    <label>I am Applying for: (Select only one box)</label>
                    <div className="checkbox-group">
                        <input type="checkbox" id="initialPermission" name="initialPermission" checked={formData.initialPermission} onChange={handleApplicationTypeChange} />
                        <label htmlFor="initialPermission">1.a. Initial permission to accept employment</label>
                    </div>
                    <div className="checkbox-group">
                        <input type="checkbox" id="replacement" name="replacement" checked={formData.replacement} onChange={handleApplicationTypeChange} />
                        <label htmlFor="replacement">1.b. Replacement of lost, stolen, or damaged employment
                        authorization document, or correction of my
                        employment authorization document NOT DUE to
                        U.S. Citizenship and Immigration Services (USCIS)
                        error.
                        NOTE: Replacement (correction) of an employment
                        authorization document due to USCIS error does not
                        require a new Form I-765 and filing fee. Refer to
                        Replacement for Card Error in the What is the
                        Filing Fee section of the Form I-765 Instructions for
                        further details.</label>
                    </div>
                    <div className="checkbox-group">
                        <input type="checkbox" id="renewal" name="renewal" checked={formData.renewal} onChange={handleApplicationTypeChange} />
                        <label htmlFor="renewal">1.c. Renewal of my permission to accept employment.
                        (Attach a copy of your previous employment
                        authorization document.)</label>
                    </div>
                </div>
              {/* Family Name, Given Name, Middle Name */}
              <div className="form-group">
                  <label>Part 2. Information About You</label>
                  <label>Your Full Legal Name</label>
                  <label>1.a. Family Name (Last Name):</label>
                  <input type="text" name="familyName" value={formData.familyName} onChange={handleInputChange} required className="form-control" />
              </div>
              <div className="form-group">
                  <label>1.b. Given Name (First Name):</label>
                  <input type="text" name="givenName" value={formData.givenName} onChange={handleInputChange} required className="form-control" />
              </div>
              <div className="form-group">
                  <label>1.c. Middle Name:</label>
                  <input type="text" name="middleName" value={formData.middleName} onChange={handleInputChange} className="form-control" />
              </div>
            {/* Other Names Used */}
            <div className="form-group">
            <label>Other Names Used</label>
                {Array.from({ length: 3 }, (_, index) => (
                    <div key={index} className="form-group">
                        <label>{index + 2}.a.Family Name (Last Name):</label>
                        <input
                            type="text"
                            name={`otherNames_familyName_${index + 1}`}
                            value={formData[`otherNames_familyName_${index + 1}`]}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                        <label>{index + 2}.b. Given Name (First Name):</label>
                        <input
                            type="text"
                            name={`otherNames_givenName_${index + 1}`}
                            value={formData[`otherNames_givenName_${index + 1}`]}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                        <label>{index + 2}.c.Middle Name:</label>
                        <input
                            type="text"
                            name={`otherNames_middleName_${index + 1}`}
                            value={formData[`otherNames_middleName_${index + 1}`]}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                ))}
            </div>
              {/* U.S. Mailing Address */}
                <div className="form-group">
                    <label>Your U.S. Mailing Address</label>
                    <label>5.a. In Care Of Name (if any):</label>
                    <input type="text" name="inCareOfName" value={formData.inCareOfName} onChange={handleInputChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>5.b. Street Number and Name:</label>
                    <input type="text" name="streetNumberName" value={formData.streetNumberName} onChange={handleInputChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>5.c. Apartment, Suite, Floor:</label>
                    <input type="text" name="aptSteFlr" value={formData.aptSteFlr} onChange={handleInputChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>5.d. City or Town:</label>
                    <input type="text" name="cityOrTown" value={formData.cityOrTown} onChange={handleInputChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>5.e. State:</label>
                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>ZIP Code:</label>
                    <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>6. Is your current mailing address the same as your physical address?</label>
                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            id="isPhysicalSameAsMailing"
                            name="isPhysicalSameAsMailing"
                            checked={formData.isPhysicalSameAsMailing}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="isPhysicalSameAsMailing">Yes</label>   
                    </div>
                    <label>
                        NOTE: If not, provide your physical address below.
                    </label> 
                </div>

                {/* U.S. Physical Address (Only show if different from Mailing Address) */}
                {!formData.isPhysicalSameAsMailing && (
                    <>
                        <label>U.S. Physical Address</label>
                        <div className="form-group">
                            <label>7.a. Street Number and Name:</label>
                            <input type="text" name="physicalStreetNumberName" value={formData.physicalStreetNumberName} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>7.b. Apartment, Suite, Floor, etc.:</label>
                            <input type="text" name="physicalAptSteFlr" value={formData.physicalAptSteFlr} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>7.c. City or Town:</label>
                            <input type="text" name="physicalCityOrTown" value={formData.physicalCityOrTown} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>7.d. State:</label>
                            <input type="text" name="physicalState" value={formData.physicalState} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>ZIP Code:</label>
                            <input type="text" name="physicalZipCode" value={formData.physicalZipCode} onChange={handleInputChange} className="form-control" />
                        </div>
                    </>
                )}

              {/* Other Information Section */}
              <div className="form-group">
                    <label>Other Information</label>
                    <label>8. Alien Registration Number (A-Number) (if any):</label>
                    <input type="text" name="alienRegistrationNumber" value={formData.alienRegistrationNumber} onChange={handleInputChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>9. USCIS Online Account Number (if any):</label>
                    <input type="text" name="uscisOnlineAccountNumber" value={formData.uscisOnlineAccountNumber} onChange={handleInputChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>10. Gender:</label>
                    <select name="gender" value={formData.gender} onChange={handleInputChange} className="form-control">
                        <option value="">Select One</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>11. Marital Status:</label>
                    <select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} className="form-control">
                        <option value="">Select One</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                    </select>
                </div>
              {/* Question about previously filed Form I-765 */}
              <div className="form-group">
                    <label>12. Have you previously filed Form I-765?</label>
                    <div className="radio-group">
                        <input type="radio" id="filedI765-yes" name="hasPreviouslyFiledI765" value="Yes" onChange={handleRadioChange} checked={formData.hasPreviouslyFiledI765 === true} />
                        <label htmlFor="filedI765-yes">Yes</label>
                        <input type="radio" id="filedI765-no" name="hasPreviouslyFiledI765" value="No" onChange={handleRadioChange} checked={formData.hasPreviouslyFiledI765 === false} />
                        <label htmlFor="filedI765-no">No</label>
                    </div>
                </div>

                {/* Question about SSA card issuance */}
                <div className="form-group">
                    <label>13.a. Has the Social Security Administration (SSA) ever officially issued a Social Security card to you?</label>
                    <div className="radio-group">
                        <input type="radio" id="ssacard-yes" name="hasSSACard" value="Yes" onChange={handleRadioChange} checked={formData.hasSSACard === true} />
                        <label htmlFor="ssacard-yes">Yes</label>
                        <input type="radio" id="ssacard-no" name="hasSSACard" value="No" onChange={handleRadioChange} checked={formData.hasSSACard === false} />
                        <label htmlFor="ssacard-no">No</label>
                    </div>
                    <label>NOTE: If you answered “No” to Item Number 13.a.,
                            skip to Item Number 14. If you answered “Yes” to Item
                            Number 13.a., provide the information requested in Item
                            Number 13.b.
                    </label>
                </div>

                {/* Social Security Number input */}
                {formData.hasSSACard && (
                    <div className="form-group">
                        <label>13.b. Provide your Social Security number (SSN) (if known):</label>
                        <input type="text" name="ssn" value={formData.ssn} onChange={handleInputChange} className="form-control" />
                    </div>
                )}
                {/* SSA Card Issuance Consent */}
                <div className="form-group">
                <label>14. Do you want the SSA to issue you a Social Security card?
                (You must also answer “Yes” to Item Number 15., Consent for Disclosure, to receive a card.)
                </label>
                <div className="radio-group">
                    <input 
                        type="radio" 
                        id="wantsSSACardYes" 
                        name="wantsSSACard" 
                        value="Yes" 
                        onChange={handleRadioChange} 
                        checked={formData.wantsSSACard === true} 
                    />
                    <label htmlFor="wantsSSACardYes">Yes</label>

                    <input 
                        type="radio" 
                        id="wantsSSACardNo" 
                        name="wantsSSACard" 
                        value="No" 
                        onChange={handleRadioChange} 
                        checked={formData.wantsSSACard === false} 
                    />
                    <label htmlFor="wantsSSACardNo">No</label>
                </div>
                <label>NOTE: If you answered “No” to Item Number 14., skip
                to Part 2., Item Number 18.a. If you answered “Yes” to
                Item Number 14., you must also answer “Yes” to Item
                Number 15.
                </label>
                </div>

                {/* SSA Disclosure Consent */}
                <div className="form-group">
                    <label>15. Consent for Disclosure:I authorize disclosure of
                    information from this application to the SSA as required
                    for the purpose of assigning me an SSN and issuing me a
                    Social Security card.
                    </label>
                    <div className="checkbox-group">
                        <input type="checkbox" id="consentForSSADisclosure" name="consentForSSADisclosure" checked={formData.consentForSSADisclosure} onChange={handleCheckboxChange} />
                        <label htmlFor="consentForSSADisclosure">Yes</label>
                    </div>
                    <label>NOTE: If you answered “Yes” to Item Numbers
                    14. - 15., provide the information requested in Item
                    Numbers 16.a. - 17.b.</label>
                </div>

                {/* Parent's Names */}
                <div className="form-group">
                    <label>Father's Name</label>
                    <label>Provide your father's birth name.</label>
                    <label>16.a. Family Name (Last Name):</label>
                    <input type="text" name="fatherFamilyName" value={formData.fatherFamilyName} onChange={handleInputChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>16.b. Given Name (First Name):</label>
                    <input type="text" name="fatherGivenName" value={formData.fatherGivenName} onChange={handleInputChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Mother's Name</label>
                    <label>Provide your mother's birth name.</label>
                    <label>17.a. Family Name (Last Name):</label>
                    <input type="text" name="motherFamilyName" value={formData.motherFamilyName} onChange={handleInputChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>17.b. Given Name (Last Name):</label>
                    <input type="text" name="motherGivenName" value={formData.motherGivenName} onChange={handleInputChange} className="form-control" />
                </div>

                {/* Countries of Citizenship or Nationality */}
                <div className="form-group">
                    <label>Your Country or Countries of Citizenship or Nationality</label>
                    <label>List all countries where you are currently a citizen or national.</label>
                    <label>18.a. Country:</label>
                    <input type="text" name="countriesOfCitizenship1" value={formData.countriesOfCitizenship1} onChange={handleInputChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>18.b. Country:</label>
                    <input type="text" name="countriesOfCitizenship2" value={formData.countriesOfCitizenship2} onChange={handleInputChange} className="form-control" />
                </div>              

              {/* Place of Birth */}
              <div className="form-group">
                  <label>Place of Birth</label>  
                  <label>List the city/town/village, state/province, and country where you were born.</label>
                  <label>19.a. City/Town/Village of Birth:</label>
                  <input type="text" name="cityOfBirth" value={formData.cityOfBirth} onChange={handleInputChange} className="form-control" />
              </div>
              <div className="form-group">
                  <label>19.b. State/Province of Birth:</label>
                  <input type="text" name="stateProvinceOfBirth" value={formData.stateProvinceOfBirth} onChange={handleInputChange} className="form-control" />
              </div>
              <div className="form-group">
                  <label>19.c. Country of Birth:</label>
                  <CountryDropdown name="countryOfBirth" />
              </div>
              <div className="form-group">
                  <label>20. Date of Birth:</label>
                  <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required className="form-control" />
              </div>

              {/* Current Immigration Status, Immigration Status at Your Last Arrival */}
              <div className="form-group">
                  <label>Information About Your Last Arrival in the United States</label>
                  <label>21.a. Form I-94 Arrival-Departure Record Number:</label>
                  <input type="text" name="formI94Number" value={formData.formI94Number} onChange={handleInputChange} className="form-control" />
              </div>
              {/* Passport Number of Your Most Recently Issued Passport */}
              <div className="form-group">
                  <label>21.b. Passport Number of Your Most Recently Issued Passport:</label>
                  <input type="text" name="passportNumber" value={formData.passportNumber} onChange={handleInputChange} className="form-control" />
              </div>
               {/* Travel Document Number, Form I-94 Arrival-Departure Record Number */}
               <div className="form-group">
                  <label>21.c. Travel Document Number:</label>
                  <input type="text" name="travelDocumentNumber" value={formData.travelDocumentNumber} onChange={handleInputChange} className="form-control" />
              </div>
              {/* Country That Issued Your Passport or Travel Document, Expiration Date for Passport or Travel Document */}
              <div className="form-group">
                  <label>21.d. Country That Issued Your Passport or Travel Document:</label>
                  <CountryDropdown name="countryOfPassport" />
              </div>
              <div className="form-group">
                  <label>21.e. Expiration Date for Passport or Travel Document:</label>
                  <input type="date" name="passportExpirationDate" value={formData.passportExpirationDate} onChange={handleInputChange} className="form-control" />
              </div>
              
              {/* Date of Last Arrival and Place of Last Arrival Into the United States */}
              
              <div className="form-group">
                  <label>22. Date of Last Arrival Into the United States:</label>
                  <input type="date" name="dateOfLastArrival" value={formData.dateOfLastArrival} onChange={handleInputChange} className="form-control" />
              </div>
              <div className="form-group">
                  <label>23. Place of Last Arrival Into the United States:</label>
                  <input type="text" name="placeOfLastArrival" value={formData.placeOfLastArrival} onChange={handleInputChange} className="form-control" />
              </div>

              <div className="form-group">
                  <label>24. Immigration Status at Your Last Arrival (for example, B-2 visitor, F-1 student, or no status):</label>
                  <input type="text" name="immigrationStatusAtArrival" value={formData.immigrationStatusAtArrival} onChange={handleInputChange} className="form-control" />
              </div>
              <div className="form-group">
                  <label>25. Your Current Immigration Status or Category (for example, B-2 visitor, F-1 student, parolee, deferred action, or no status or category):</label>
                  <input type="text" name="currentImmigrationStatus" value={formData.currentImmigrationStatus} onChange={handleInputChange} className="form-control" />
              </div>
              <div className="form-group">
                  <label>26. Student and Exchange Visitor Information System (SEVIS) Number (if any):</label>
                  <input type="text" name="sevisNumber" value={formData.sevisNumber} onChange={handleInputChange} className="form-control" />
              </div>
              
              <div className="form-group">
                  <label>Information About Your Eligibility Category</label>
                  <label>27. Eligibility Category. Refer to the Who May File Form
                    I-765 section of the Form I-765 Instructions to determine
                    the appropriate eligibility category for this application.
                    Enter the appropriate letter and number for your eligibility
                    category below (for example, (a)(8), (c)(17)(iii)).
                    </label>
                  <input type="text" name="eligibilityCategory" value={formData.eligibilityCategory} onChange={handleInputChange} required className="form-control" />
              </div>
              <div className="form-group">
                  <label>28. (c)(3)(C) STEM OPT Eligibility Category. If you
                    entered the eligibility category (c)(3)(C) in Item Number
                    27., provide the information requested in Item Numbers
                    28.a - 28.c.:</label>
                  <input type="text" name="stemOptCategory" value={formData.stemOptCategory} onChange={handleInputChange} className="form-control" />
              </div>
              
              {formData.eligibilityCategory === '(c)(3)(C)' && (
                    <div className="form-group">
                        <label>28.a. Degree:</label>
                        <input type="text" name="degree" value={formData.degree} onChange={handleInputChange} className="form-control" />
                    </div>
                )}
              {/* Employer's details */}
              <div className="form-group">
                  <label>28.b. Employer's Name as Listed in E-Verify:</label>
                  <input type="text" name="employerNameEVerify" value={formData.employerNameEVerify} onChange={handleInputChange} className="form-control" />
              </div>

              {/* Employer's E-Verify Company Identification Number, Eligibility Category */}
              <div className="form-group">
                  <label>28.c. Employer's E-Verify Company Identification Number:</label>
                  <input type="text" name="employerEVerifyID" value={formData.employerEVerifyID} onChange={handleInputChange} className="form-control" />
              </div>
              
              {/* Other conditional fields based on the eligibility category */}
              {formData.eligibilityCategory === '(c)(26)' && (
                    <div className="form-group">
                        <label>29.(c)(26) Eligibility Category. If you entered the eligibility
                                category (c)(26) in Item Number 27., provide the receipt
                                number of your H-1B spouse's most recent Form I-797
                                Notice for Form I-129, Petition for a Nonimmigrant
                                Worker.:</label>
                        <input type="text" name="h1bSpouseI797ReceiptNumber" value={formData.h1bSpouseI797ReceiptNumber} onChange={handleInputChange} className="form-control" />
                    </div>
                )}

              {/* Arrested or Convicted of Any Crime */}
              
              <div className="form-group">
                <label>30.(c)(8) Eligibility Category. If you entered the eligibility
                        category (c)(8) in Item Number 27., have you EVER
                        been arrested for and/or convicted of any crime?</label>
                <div>
                    <input type="radio" id="yes" name="arrestedOrConvicted_1" value="Yes" checked={formData.arrestedOrConvicted_1 === true} onChange={handleRadioChange} className="form-check-input" />
                    <label htmlFor="yes">Yes</label>
                </div>
                <div>
                    <input type="radio" id="no" name="arrestedOrConvicted_1" value="No" checked={formData.arrestedOrConvicted_1 === false} onChange={handleRadioChange} className="form-check-input" />
                    <label htmlFor="no">No</label>
                </div>
                <label>NOTE: If you answered “Yes” to Item Number 30.,
                        refer to Special Filing Instructions for Those With
                        Pending Asylum Applications (c)(8) in the Required
                        Documentation section of the Form I-765 Instructions
                        for information about providing court dispositions.</label>
              </div>
              

              {(formData.eligibilityCategory === '(c)(35)' || formData.eligibilityCategory === '(c)(36)') && (
                    <div className="form-group">
                        <label>31.a. (c)(35) and (c)(36) Eligibility Category. If you entered
                                the eligibility category (c)(35) in Item Number 27., please
                                provide the receipt number of your Form I-797 Notice for
                                Form I-140, Immigrant Petition for AlienWorker. If you
                                entered the eligibility category (c)(36) in Item Number
                                27., please provide the receipt number of your spouse's or
                                parent's Form I-797 Notice for Form I-140.
                                </label>
                        <input type="text" name="i140ReceiptNumber" value={formData.i140ReceiptNumber} onChange={handleInputChange} className="form-control" />
                    </div>
                )}

            {/* Arrested or Convicted of Any Crime */}
              
            <div className="form-group">
                <label>31.b. If you entered the eligibility category (c)(35) or (c)(36) in
                        Item Number 27., have you EVER been arrested for
                        and/or convicted of any crime?</label>
                <div>
                    <input type="radio" id="yes" name="arrestedOrConvicted_2" value="Yes" checked={formData.arrestedOrConvicted_2 === true} onChange={handleInputChange} className="form-check-input" />
                    <label htmlFor="yes">Yes</label>
                </div>
                <div>
                    <input type="radio" id="no" name="arrestedOrConvicted_2" value="No" checked={formData.arrestedOrConvicted_2 === false} onChange={handleInputChange} className="form-check-input" />
                    <label htmlFor="no">No</label>
                </div>
                <label>NOTE: If you answered “Yes” to Item Number 31.b.,
                        refer to Employment-Based Nonimmigrant Categories,
                        Items 8. - 9., in the Who May File Form I-765 section
                        of the Form I-765 Instructions for information about
                        providing court dispositions.</label>
              </div>
              
                <button type="submit" className="submit-button">Save details</button>
          </form>
      </div>
  );
}

export default FormPage;