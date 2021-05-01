import * as React from "react";
import { ScrollView } from "react-native";
import HashtagBox from "./HashtagBox.js";

class MyHashtags extends React.PureComponent {
  createCheckbox = (option) => (
    <HashtagBox
      label={option}
      isSelected={this.props.data.checkboxes1[option]}
      onCheckboxChange={this.props.memoryCheck}
      key={option}
      list={this.props.data.hashtags1[option]}
    />
  );

  createCheckboxes = () => this.props.options.map(this.createCheckbox);

  render() {
    return <ScrollView>{this.createCheckboxes()}</ScrollView>;
  }
}

export default MyHashtags;
