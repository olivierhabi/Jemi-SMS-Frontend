import React, { Component } from "react";
import Dropzone from "react-dropzone";
import csv from "csvtojson";

export default class ModifiedDropZone extends Component {
  state = {
    files: []
  };

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({
      files: acceptedFiles
    });

    acceptedFiles.forEach(file => {
      const reader = new FileReader();

      reader.onload = () => {
        const fileAsBinaryString = reader.result;

        csv({
          noheader: true,
          output: "json"
        })
          .fromString(fileAsBinaryString)
          .then(csvRows => {
            const toJson = [];
            csvRows.forEach((aCsvRow, i) => {
              if (i !== 0) {
                const builtObject = {};

                Object.keys(aCsvRow).forEach(aKey => {
                  const valueToAddInBuiltObject = aCsvRow[aKey];
                  const keyToAddInBuiltObject = csvRows[0][aKey];
                  builtObject[keyToAddInBuiltObject] = valueToAddInBuiltObject;
                });

                toJson.push(builtObject);
              }
            });

            const { getJson } = this.props;
            getJson(toJson);
          });
      };

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");

      reader.readAsText(file, "ISO-8859-1");
    });
  };

  render() {
    const { children } = this.props;
    return (
      <Dropzone className="dropzone" multiple={false} onDrop={this.onDrop}>
        {children}
      </Dropzone>
    );
  }
}
