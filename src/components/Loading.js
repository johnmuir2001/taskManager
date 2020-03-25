import React from "react";
import { css } from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";
import FadeIn from 'react-fade-in';
import "../css/loading.css"

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #7ED857;
`;
 
class AwesomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
        this.setState({ loading: false});
    }, 2000);
  }

  render() {
    const { loading } = this.state
    const { children } = this.props

    return (
      <>
      {loading ? (
        <div className="sweet-loading">
          <BarLoader
            css={override}
            size={100}
            color={"#7ED857"}
            loading={loading}
          />
        </div>
      ) : (
        <FadeIn>
          {children}
        </FadeIn>
      )}
      </>
    );
  }
}

export default AwesomeComponent





