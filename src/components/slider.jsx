import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
export default class SimpleSlider extends Component {
  getImageSource(path) {
    const imgURL = process.env.REACT_APP_LARGEIMG;
    if (path) return `${imgURL + path}`;
    else return "/static/profile.jpg";
  }
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 350,
          settings: {
            slidesToShow: 2
          }
        }
      ],
      autoplay: true,
      autoplaySpeed: 2000
    };
    const { cast } = this.props;
    return (
      <div>
        <Slider {...settings}>
          {cast &&
            cast.map(c => (
              <Link to={`/person/${c.id}`} key={c.name}>
                <div className="card">
                  <img src={this.getImageSource(c.profile_path)} alt={c.name} />
                  <div className="card-body">
                    <p>{c.name}</p>
                  </div>
                </div>
              </Link>
            ))}
        </Slider>
      </div>
    );
  }
}
