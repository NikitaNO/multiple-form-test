import React from 'react';
import {Field, reduxForm} from 'redux-form';
import { renderDate, renderError, renderSelector } from '../helpers/formComponets';
import FooterForm from './FooterForm';
import moment from 'moment';

@reduxForm({
  form: 'multi',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})
export default class MultiStepsFormSecondPage extends React.Component {
  render() {
    const {handleSubmit, previousPage} = this.props;
    return (
      <form className="second-form" onSubmit={handleSubmit}>
        <label className="main-label">DATE OF BIRTH</label>
        <div className="date-wrapper">
          <Field
            name="birthdayDay"
            type="text"
            component={renderDate}
            placeholder="DD"
          />
          <Field
            name="birthdayMonth"
            type="number"
            component={renderDate}
            placeholder="MM"
          />
          <Field
            name="birthdayYear"
            type="number"
            component={renderDate}
            placeholder="YYYY"
          />
        </div>
        <div className="fixed-div">
          <label className="main-label">GENDER</label>
          <div className="field-wrapper-gender">
            <label className="label-gender" onClick={() => classToggle(0)}>
              <Field name="sex" component="input" type="radio" value="male"/>
              {' '}
              Male
            </label>
            <label className="label-gender label-gender-second" onClick={() => classToggle(1)}>
              <Field name="sex" component="input" type="radio" value="female"/>
              {' '}
              Female
            </label>
            <label className="label-gender label-gender-third" onClick={() => classToggle(2)}>
              <Field name="sex" component="input" type="radio" value="unspecified"/>
              {' '}
              Unspecified
            </label>
          </div>
          <Field name="sex" component={renderError}/>
        </div>
        <Field name="how_hear_about_us" component={renderSelector} options={["From media", "From friends"]}/>
        <FooterForm
          isBack={true}
          previousPage={previousPage}
        />
      </form>
    );
  }
};





const classToggle = (i) => {
  const menu = document.querySelectorAll('.label-gender');
  for (let cnt = 0; cnt < menu.length; cnt++) {
    menu[cnt].classList.remove('active');
    menu[cnt].classList.remove('active-first');
    menu[cnt].classList.remove('active-third');
  }
  switch (i) {
    case 0:
      menu[i].classList.add('active-first');
      break;
    case 1:
      menu[i].classList.add('active');
      break;
    case 2:
      menu[i].classList.add('active-third');
  }
}

function validate(values) {
  const errors = {};
  // Birthday day
  if (!values.birthdayDay) {
    errors.birthdayDay = 'Required';
  } else if (values.birthdayDay > 31 || values.birthdayDay < 1) {
    errors.birthdayDay = 'Invalid';
  }

  // Birthday month
  if (!values.birthdayMonth) {
    errors.birthdayMonth = 'Required';
  } else if (values.birthdayMonth > 12 || values.birthdayMonth < 1) {
    errors.birthdayMonth = 'Invalid';
  } else if (values.birthdayMonth.length < 2) {
    errors.birthdayMonth = 'Invalid';
  }

  // Birthday year
  if (!values.birthdayYear) {
    errors.birthdayYear = 'Required';
  } else if (values.birthdayYear.length != 4) {
    errors.birthdayYear = 'Invalid';
  } else {
    const userDate = new Date(`${values.birthdayYear}-${values.birthdayMonth}-${values.birthdayDay}`);
    const isAdult = moment(userDate, "YYYYMMDD").fromNow().split(' ')[0];
    if (parseInt(isAdult) < 18) {
      errors.birthdayYear = 'Not Adult';
    } else if (isNaN(parseInt(isAdult))) {
      errors.birthdayYear = 'You are not born';
    }
  }

  // Sex
  if (!values.sex) {
    errors.sex = 'Required';
  }
  return errors;
}

