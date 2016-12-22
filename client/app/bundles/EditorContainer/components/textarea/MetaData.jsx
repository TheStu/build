import React, { PropTypes } from 'react';
var DatePicker = require('react-datepicker');
var moment = require('moment');
// import { DatePicker } from 'react-datepicker';
// import { moment } from 'moment';

export default class MetaData extends React.Component {

  constructor(props) {
    super(props);

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handlePublishedDateChange = this.handlePublishedDateChange.bind(this);
    this.handleSubtitleChange = this.handleSubtitleChange.bind(this);
    this.handlePublisherChange = this.handlePublisherChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handleIsbnChange = this.handleIsbnChange.bind(this);
    this.handleVersionChange = this.handleVersionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(e) {
    this.props.handleTitleChange(e.target.value);
  }

  handleAuthorChange(e) {
    this.props.handleAuthorChange(e.target.value);
  }

  handlePublishedDateChange(date) {
    this.props.handlePublishedDateChange(date.format('YYYY-MM-DD'));
  }

  handleSubtitleChange(e) {
    this.props.handleSubtitleChange(e.target.value);
  }

  handlePublisherChange(e) {
    this.props.handlePublisherChange(e.target.value);
  }

  handleDescriptionChange(e) {
    this.props.handleDescriptionChange(e.target.value);
  }

  handleSubjectChange(e) {
    this.props.handleSubjectChange(e.target.value);
  }

  handleLanguageChange(e) {
    this.props.handleLanguageChange(e.target.value);
  }

  handleIsbnChange(e) {
    this.props.handleIsbnChange(e.target.value);
  }

  handleVersionChange(e) {
    this.props.handleVersionChange(e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleBookUpdate();
  }

  render() {
    return (
      <div>
        <h2>Book Meta Data</h2>
        <form onSubmit={this.handleSubmit} className="meta-data-form" >
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <input placeholder="Title" id="meta-data-title" className="input-sm form-control" type="text" value={this.props.book.title} onChange={this.handleTitleChange} />
              </div>
            </div>

            <div className="col-sm-6">
              <div className="form-group">
                <input placeholder="Sub-Title" id="meta-data-subtitle" className="input-sm form-control" type="text" value={this.props.book.subtitle} onChange={this.handleSubtitleChange} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <input placeholder="Author" id="meta-data-author" className="input-sm form-control" type="text" value={this.props.book.author} onChange={this.handleAuthorChange} />
              </div>
            </div>

            <div className="col-sm-6">
              <div className="form-group">
                <input placeholder="Publisher" id="meta-data-publisher" className="input-sm form-control" type="text" value={this.props.book.publisher} onChange={this.handlePublisherChange} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <textarea rows='5' placeholder="Description" id="meta-data-description" className="input-sm form-control" type="text" value={this.props.book.description} onChange={this.handleDescriptionChange} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <input placeholder="Genre" id="meta-data-subject" className="input-sm form-control" type="text" value={this.props.book.subject} onChange={this.handleSubjectChange} />
              </div>
            </div>

            <div className="col-sm-6">
              <div className="form-group">
                <DatePicker
                  dateFormat="YYYY-MM-DD"
                  selected={this.props.book.published_at ? moment(this.props.book.published_at) : null}
                  onChange={this.handlePublishedDateChange}
                  placeholderText="Publishing Date"
                  className="input-sm form-control"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-4">
              <div className="form-group">
                <select defaultValue={this.props.book.language || ''} id="meta-data-language" className="input-sm form-control" type="text" onChange={this.handleLanguageChange} >
                  <option className="placeholder" value="" disabled>Language...</option>
                  <option value="AF">Afrikanns</option>
                  <option value="SQ">Albanian</option>
                  <option value="AR">Arabic</option>
                  <option value="HY">Armenian</option>
                  <option value="EU">Basque</option>
                  <option value="BN">Bengali</option>
                  <option value="BG">Bulgarian</option>
                  <option value="CA">Catalan</option>
                  <option value="KM">Cambodian</option>
                  <option value="ZH">Chinese (Mandarin)</option>
                  <option value="HR">Croation</option>
                  <option value="CS">Czech</option>
                  <option value="DA">Danish</option>
                  <option value="NL">Dutch</option>
                  <option value="EN">English</option>
                  <option value="ET">Estonian</option>
                  <option value="FJ">Fiji</option>
                  <option value="FI">Finnish</option>
                  <option value="FR">French</option>
                  <option value="KA">Georgian</option>
                  <option value="DE">German</option>
                  <option value="EL">Greek</option>
                  <option value="GU">Gujarati</option>
                  <option value="HE">Hebrew</option>
                  <option value="HI">Hindi</option>
                  <option value="HU">Hungarian</option>
                  <option value="IS">Icelandic</option>
                  <option value="ID">Indonesian</option>
                  <option value="GA">Irish</option>
                  <option value="IT">Italian</option>
                  <option value="JA">Japanese</option>
                  <option value="JW">Javanese</option>
                  <option value="KO">Korean</option>
                  <option value="LA">Latin</option>
                  <option value="LV">Latvian</option>
                  <option value="LT">Lithuanian</option>
                  <option value="MK">Macedonian</option>
                  <option value="MS">Malay</option>
                  <option value="ML">Malayalam</option>
                  <option value="MT">Maltese</option>
                  <option value="MI">Maori</option>
                  <option value="MR">Marathi</option>
                  <option value="MN">Mongolian</option>
                  <option value="NE">Nepali</option>
                  <option value="NO">Norwegian</option>
                  <option value="FA">Persian</option>
                  <option value="PL">Polish</option>
                  <option value="PT">Portuguese</option>
                  <option value="PA">Punjabi</option>
                  <option value="QU">Quechua</option>
                  <option value="RO">Romanian</option>
                  <option value="RU">Russian</option>
                  <option value="SM">Samoan</option>
                  <option value="SR">Serbian</option>
                  <option value="SK">Slovak</option>
                  <option value="SL">Slovenian</option>
                  <option value="ES">Spanish</option>
                  <option value="SW">Swahili</option>
                  <option value="SV">Swedish </option>
                  <option value="TA">Tamil</option>
                  <option value="TT">Tatar</option>
                  <option value="TE">Telugu</option>
                  <option value="TH">Thai</option>
                  <option value="BO">Tibetan</option>
                  <option value="TO">Tonga</option>
                  <option value="TR">Turkish</option>
                  <option value="UK">Ukranian</option>
                  <option value="UR">Urdu</option>
                  <option value="UZ">Uzbek</option>
                  <option value="VI">Vietnamese</option>
                  <option value="CY">Welsh</option>
                  <option value="XH">Xhosa</option>
                </select>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="form-group">
                <input placeholder="ISBN" id="meta-data-isbn" className="input-sm form-control" type="text" value={this.props.book.isbn} onChange={this.handleIsbnChange} />
              </div>
            </div>

            <div className="col-sm-4">
              <div className="form-group">
                <input placeholder="Version" id="meta-data-version" className="input-sm form-control" type="text" value={this.props.book.version} onChange={this.handleVersionChange} />
              </div>
            </div>
          </div>

          <button disabled={false} className="btn btn-primary btn-sm" type="submit">Save</button>
        </form>
      </div>
    );
  }
}