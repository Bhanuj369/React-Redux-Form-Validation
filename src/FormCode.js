import React from 'react';
import { Field, reduxForm}  from 'redux-form';
import './App.css';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
      <div>
        <input {...input} placeholder={label} type={type} className="form-control" />
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
  )


  const renderFieldRadio = ({ input, label, id, type, meta: { touched, error, warning } }) => (
    <div>
      <input id={id} {...input} placeholder={label} type={type}/>
      <label htmlFor={id}> &nbsp;&nbsp;{label}</label>
      {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
)


const SelectField = ({ input, label, id, meta: {touched, error}, children }) => (
      <div>
      <label className="label">{label}</label>
      <select {...input} id = {id} className="form-control mb-3">
        {children}
      </select>
      {touched && (error && <p className="text-danger">{error}</p>)}
      </div>
);


const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);
const FileInput = ({ 
    input: { value: omitValue, onChange, onBlur, ...input }, accept,
    meta: {omitMeta, touched, error, warning}, 
    ...props 
    }) =>  (
        <div>
      <input
        {...input}
        onChange={adaptFileEventToValue(onChange)}
        onBlur={adaptFileEventToValue(onBlur)}
        type="file"
        accept="image/*"
        {...props.input}
        {...props}
        className="form-control"
      />
      {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}</div>
    )
  

const renderTextField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
      <textarea {...input} placeholder={label} type={type} className="form-control" />
      {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
)

const renderFieldRadioSelector = () => (
  <div className="container border rounded">
    <div className="row">
      <div className="col">  
        <Field component={renderFieldRadio} name="location" type="radio" label="Offshore" id='off' value="offshore"/>
      </div>
      <div className="col">
        <Field component={renderFieldRadio} label="Onshore" name="location" type="radio" id='on' value="onshore"/>
      </div> 
      <div className="col">&nbsp;</div>
      <div className="col">&nbsp;</div>
      <div className="col">&nbsp;</div>
      <div className="col">&nbsp;</div>
      <div className="col">&nbsp;</div>
      <div className="col">&nbsp;</div>
    </div>
    <div>
      {document.querySelector('input[id="on"]:checked') ? (
        <Field name="onShoreList" id="onsite" className="row" component={SelectField}>
          <option value="" name="null" disabled> Select On Shore Location</option>
          <option value="US" name="us">US</option>
          <option value="Non US" name="nonus">Non US</option>
        </Field>
        ) : (document.querySelector('input[id="off"]:checked')?
        <Field name="offShoreList" id="offshore" className="row" component={SelectField}>
          <option value="" name="null" disabled> Select Off Shore Location</option>
          <option value="chennai" name="chennai">Chennai</option>
          <option value="bangalore" name="bangalore">Bangalore</option>
          <option value="hyderabad" name="hyderabad">Hyderabad</option>
          <option value="pune" name="pune">Pune</option>
         <option value="kochi" name="kochi">Kochi</option>
      </Field>:
      <Field name="nullList" className="form-control" component={SelectField}>
        <option disabled value="" name="null">Select Location</option>
      </Field>)}  
    </div>     
  </div> 
)

const renderFieldCheckboxSelector = ({meta: { touched, error, warning } }) => (
  <div className="container border rounded mb-3">
  <div className="row">
    <div className="col"><Field name="skill1" id="skill1" type="checkbox" component={renderFieldRadio} label="HTML5,CSS3,JS" /></div>
    <div className="col"><Field name="skill2" id="skill2" type="checkbox" component={renderFieldRadio} label="Angular8" /></div>
    <div className="col"><Field name="skill3" id="skill3" type="checkbox" component={renderFieldRadio} label="Express JS" /></div>
  </div>
  <div className="row">
    <div className="col"><Field name="skill4" id="skill4" type="checkbox" component={renderFieldRadio} label="SASS" /></div>
    <div className="col"><Field name="skill5" id="skill5" type="checkbox" component={renderFieldRadio} label="React JS" /></div>
    <div className="col"><Field name="skill6" id="skill6" type="checkbox" component={renderFieldRadio} label="Node JS" /></div>
  </div>
  <div className="row">
    <div className="col"><Field name="skill7" id="skill7" type="checkbox" component={renderFieldRadio} label="ES5, ES6, ES7,..." /></div>
    <div className="col"><Field name="skill8" id="skill8" type="checkbox" component={renderFieldRadio} label="Veu JS" /></div>
    <div className="col"><Field name="skill9" id="skill9" type="checkbox" component={renderFieldRadio} label="Mongo DB" /></div>
  </div>
  <div className="row">
    <div className="col "><Field name="skill10" id="skill10" type="checkbox" component={renderFieldRadio} label="Bootstrap 4" /></div>
    <div className="col"><Field name="skill11" id="skill11" type="checkbox" component={renderFieldRadio} label="TypeScript" /></div>
    <div className="col">&nbsp;</div>
  </div>
  {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
  </div>     
  )




    const validate = values => {
      const errors = {}
      
      //Associate Name > start
      if (!values.associateName) {
          errors.associateName = '*Please Enter the Associate Name'
      }
      else if (values.associateName.length < 5 || values.associateName.length > 30) {
          errors.associateName = '*Min 5 to Max 30 Characters'
      }
      if (!/^[a-z A-Z \s]+$/i.test(values.associateName)) {
        errors.associateName = '*Accepts Alphabets and Spaces'
      }
      //Associate Name > end

      //Associate ID > start
      if (!values.associateId) {
          errors.associateId = '*Please enter the Associate ID'
      }
      else if (!/^[0-9]+$/i.test(values.associateId)) {
        errors.associateId = 'Only Numbers allowed'
      }
      else if (values.associateId.length !== 6) {
          errors.associateId = 'Invalid Associate ID (6 characters required)'
      }
      //Associate ID > end
      
      //Project ID > start
      if(!values.projectId) {
          errors.projectId = '*Please enter the Project ID'
      }
      else if (!/^[0-9a-zA-Z]+$/i.test(values.projectId)) {
        errors.projectId = 'Only Alphabets and Numbers are allowed'
      }
      else if(values.projectId.length !== 12) {
          errors.projectId = 'Invalid Project ID (12 characters required)'
      }
      //Project ID > end

      //Upload Profile > Start
      if(!values.myFile) {
          errors.myFile = '*Please upload your Profile picture'
      }
      //Upload Profile > end

      //Text Area > Start
      if(!values.comments) {
        errors.comments = '*Please enter Comments'
      }
      //Text Area > end

      //Location > Start
      if(!values.workLocation) {
        errors.workLocation = '*Please enter Comments'
      }
      //Location > end
      
      //Location Dropdown > start
      if(!values.nullList) {
        errors.nullList = '*Please select Location'
      }
      if(!values.offShoreList) {
        errors.offShoreList = '*Please select Location'
      }
      if(!values.onShoreList) {
        errors.onShoreList = '*Please select Location'
      }
      //Location Dropdown > end

      //Checkbox > start
      {(document.querySelectorAll('input[type="checkbox"]:checked').length<5) ?
        (errors.checkbox = '*Please Select atleast 5 skills') :
        (errors.checkbox = null)
      }
      //Checkbox > end
      return errors
  }  



  let FormCode = props => {
      const {handleSubmit, pristine, reset, submitting} = props;
      return (
          <form onSubmit = {handleSubmit}>
              <div className="form-group">
                  <Field name="associateName" component={renderField} label="Associate Name" />
              </div>
              <div className="form-group">
                  <Field name="associateId" component={renderField} label="Associate ID" />
              </div>
              <div className="form-group">
                  <Field name="projectId" component={renderField} label="Project ID" />
              </div>
              <div className="form-group">
                <Field name="location" component={renderFieldRadioSelector} />
              </div>
              <div className="form-group">
                <Field name="checkbox" component={renderFieldCheckboxSelector} />
              </div>
              <div className="form-group">
                  <label>Upload Profile</label><br />
                  <Field type="file" component={FileInput} name="myFile" id="fileUpload" label="myFile"/>
              </div>
              <div className="form-group">
                  <Field name="comments" component={renderTextField} label="Comments..." />
              </div>
              <div className="form-group">
                  <button type="submit" className = "btn1 btn btn-primary rounded-3" disabled={pristine || submitting}>Submit</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <button type="button" className = "btn2 btn btn-danger rounded-3" disabled={pristine || submitting} onClick={reset}>Reset</button>
              </div>
              
          </form>
      )

  }

  
  FormCode = reduxForm({
    form: 'syncValidation',  // a unique identifier for this form
    validate,                // <--- validation function given to redux-form
  })(FormCode)

  
  export default FormCode