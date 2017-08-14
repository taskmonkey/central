import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect, Link, withRouter} from 'react-router-dom';
import NavTask from '../Dashboard/NavTask.jsx';
import Dropzone from 'react-dropzone';

class Reports extends Component {
  constructor() {
    super()
    this.state = {
      files: [],
    }
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files) {
    this.setState({
      files
    })
  }

  render() {
    let dropzoneRef;
    return (
      <div>
        <div className="dashboard-container">
          <div className="left-col">
            <div className="app-title">
              <h1>Task Mon</h1>
            </div>
            <NavTask />
          </div>
        </div>
        <div className="right-col">
          <div className="dashboard-title">
            <div className="reportsContainer">
              <section>
                <aside>
                  <h2>Drop Your Report Here</h2>
                  <ul>
                    {
                      this.state.files.map(f => <li>{f.name} - {f.size} bytes</li>)
                    }
                  </ul>
                </aside>
                <div>
                  <Dropzone ref={(node) => { dropzoneRef = node; }} onDrop={(accepted, rejected) => { alert(accepted) }} className="dropbox">
                      <p>Drop files here.</p>
                  </Dropzone>
                  <button type="button" onClick={() => { dropzoneRef.open() }} className="openFileButton">
                      Open File Dialog
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Reports;
