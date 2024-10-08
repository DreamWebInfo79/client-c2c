import React from 'react';

const About = () => {
  return (
    <div className="about-page">
      <div className="hero">
        <h1>Welcome to Old Car Selling</h1>
        <p>
          We are a team of car enthusiasts who are dedicated to providing the best
          platform for buying and selling old cars. Our mission is to make it easy
          for people to find their dream car and to make the process of buying and
          selling a car as smooth as possible.
        </p>
      </div>

      <div className="features">
        <h2>Our Features</h2>
        <ul>
          <li>
            <i className="fas fa-search"></i>
            <p>
              Search for cars based on make, model, year, price, and location.
            </p>
          </li>
          <li>
            <i className="fas fa-car"></i>
            <p>
              View detailed information about each car, including photos, features,
              and condition.
            </p>
          </li>
          <li>
            <i className="fas fa-user"></i>
            <p>
              Create an account and save your favorite cars to view later.
            </p>
          </li>
          <li>
            <i className="fas fa-envelope"></i>
            <p>
              Contact sellers directly through our messaging system.
            </p>
          </li>
        </ul>
      </div>

      <div className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial">
          <p>
            "I was able to find my dream car on Old Car Selling. The website is
            easy to use and the customer service is excellent." - John D.
          </p>
        </div>
        <div className="testimonial">
          <p>
            "I was skeptical at first, but Old Car Selling really delivered. I
            found a great car at a great price and the seller was very
            responsive." - Sarah K.
          </p>
        </div>
      </div>

      <div className="team">
        <h2>Our Team</h2>
        <div className="team-member">
          <img src="https://picsum.photos/200" alt="Team Member" />
          <p>
            John Doe - Founder and CEO
          </p>
        </div>
        <div className="team-member">
          <img src="https://picsum.photos/200" alt="Team Member" />
          <p>
            Jane Doe - Co-Founder and CTO
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
