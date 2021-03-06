/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"
import Cookies from "js-cookie"
import Icon from "@fortawesome/react-fontawesome"
import { faPlusCircle, faCheck } from "@fortawesome/fontawesome-free-solid"

// Components
import Page from "../components/Page"
import Loader from "../components/Loader"

// Form Elements
import Select from "../components/inputs/Select"
import Image from "../components/inputs/Image"

// Utilities
import Database from "../resources/Database"
import { valuify } from "../resources/Util"

// Images
import profile1 from "../../img/profile1.png"
import profile2 from "../../img/profile2.png"
import profile3 from "../../img/profile3.png"
/*** [end of imports] ***/

export default class Profile extends Component {
  state = {
    userId: Cookies.get("userId") || 1,
    userData: null,
    selfVerificationOpen: false
  }

  componentDidMount = () => {
    Database.getUserById({ id: this.state.userId })
      .then(result => {
        // console.log("User successfully found:", result)
        this.setState({
          userData: result.body.data.attributes
        })
      })
      .catch(error => {
        // console.error("Error getting user:", error)
        this.setState({
          userData: null
        })
      })
  }

  toggleSelfVerification = () => {
    this.setState({
      selfVerificationOpen: !this.state.selfVerificationOpen
    })
  }

  render() {
    const { userData, selfVerificationOpen } = this.state

    let subProfiles = [
      {
        name: "Juniper Work",
        avatar: profile1
      },
      {
        name: "Cool Juniper",
        avatar: profile2
      },
      {
        name: "Juniper Family",
        avatar: profile3
      }
    ]

    return (
      <Page className="profile-page" path={this.props.location.pathname}>
        <section className="profile-section avatar-section">
          <header className="profile-header">
            <h4 className="profile-title">Main Profile</h4>
          </header>

          <article className="profile-badge">
            <div
              className="profile-avatar"
              style={{
                backgroundImage: `url("${profile1}")`
              }}
            />
            <div className="profile-name">Juniper Reynolds</div>
          </article>

          <button className="card-btn verify-btn" onClick={() => this.toggleSelfVerification()}>
            <Icon icon={faCheck} className="verify-icon" />
            <span className="verify-label"> Verify yourself</span>
          </button>
        </section>

        <section className={selfVerificationOpen ? "self-verification-section open" : "self-verification-section"}>
          <header className="verification-selection-header">
            <h3 className="verification-selection-title">Choose ID to Upload</h3>
          </header>

          <Select preselectedOption="Driver's License" options={[{ description: "Driver's License" }]} />

          <h3 className="verification-selection-title">Upload a photo</h3>
          <Image />
        </section>

        <section className="profile-section">
          <header className="profile-header">
            <h4 className="profile-title">Sub Profiles</h4>
          </header>
          <div className="sub-profile-list">
            {subProfiles ? (
              subProfiles.map((subProfile, _index) => <SubProfile {...subProfile} key={_index} />)
            ) : (
              <Loader />
            )}
            <div className="new-sub-profile-btn">
              <Icon icon={faPlusCircle} className="icon" />
              <span className="label"> Add a sub profile</span>
            </div>
          </div>
        </section>
      </Page>
    )
  }
}

const SubProfile = props => (
  <Link className="sub-profile-link" to={`/profile/${valuify(props.name)}`}>
    <article className="sub-profile card">
      <div
        className="sub-profile-avatar"
        style={{
          backgroundImage: `url("${props.avatar}")`
        }}
      />
      <div className="sub-profile-name">{props.name}</div>
    </article>
  </Link>
)
