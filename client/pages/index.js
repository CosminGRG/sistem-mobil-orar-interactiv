import React, { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import API from "../api/WebService";

function HomePage() {
  return (
    <div>
      <Head>
        <title>Timetable Control Panel</title>
        <meta
          name="Admin panel pentru orar"
          content="Admin panel pentru orar"
        ></meta>
      </Head>
      <div>
        <div className="container-fluid text-center container-content">
          <h1 className="">
            <i className="fas fa-tachometer-alt"></i>
          </h1>

          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-4">
                <div className="card bg-light mb-3">
                  <div className="card-header bg-gray-900 text-white text-uppercase">
                    <i className="fas fa-user-graduate"></i> Numar total
                    utilizatori
                  </div>
                  <div className="card-body">
                    <p>Numar utilizatori</p>
                    <p className="mb-4">0</p>
                    <button
                      type="button"
                      className="hover:bg-gray-900 text-gray-600 font-semibold hover:text-white py-2 px-4 border border-gray-900 hover:border-transparent rounded mb-4"
                    >
                      <i className="fas fa-info-circle"></i> Detalii
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <div className="card bg-light mb-3">
                  <div className="card-header bg-gray-900 text-white text-uppercase">
                    <i className="fas fa-user-tie"></i> Studenti
                  </div>
                  <div className="card-body">
                    <p>Numar studenti</p>
                    <p className="mb-4">0</p>
                    <button
                      type="button"
                      className="hover:bg-gray-900 text-gray-600 font-semibold hover:text-white py-2 px-4 border border-gray-900 hover:border-transparent rounded mb-4"
                    >
                      <i className="fas fa-info-circle"></i> Detalii
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <div className="card bg-light mb-3">
                  <div className="card-header bg-gray-900 text-white text-uppercase">
                    <i className="fas fa-book-open"></i> PROFESORI
                  </div>
                  <div className="card-body">
                    <p>Numar profesori</p>
                    <p className="mb-4">0</p>
                    <button
                      type="button"
                      className="hover:bg-gray-900 text-gray-600 font-semibold hover:text-white py-2 px-4 border border-gray-900 hover:border-transparent rounded mb-4"
                    >
                      <i className="fas fa-info-circle"></i> Detalii
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-4">
                <div className="card bg-light mb-3">
                  <div className="card-header bg-gray-900 text-white text-uppercase">
                    <i className="fas fa-book-open"></i> GRUPE
                  </div>
                  <div className="card-body">
                    <p>Numar grupe</p>
                    <p className="mb-4">0</p>
                    <button
                      type="button"
                      className="hover:bg-gray-900 text-gray-600 font-semibold hover:text-white py-2 px-4 border border-gray-900 hover:border-transparent rounded mb-4"
                    >
                      <i className="fas fa-info-circle"></i> Detalii
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <div className="card bg-light mb-3">
                  <div className="card-header bg-gray-900 text-white text-uppercase">
                    <i className="fas fa-book-open"></i> ORARE
                  </div>
                  <div className="card-body">
                    <p>Numar orare</p>
                    <p className="mb-4">0</p>
                    <button
                      type="button"
                      className="hover:bg-gray-900 text-gray-600 font-semibold hover:text-white py-2 px-4 border border-gray-900 hover:border-transparent rounded mb-4"
                    >
                      <i className="fas fa-info-circle"></i> Detalii
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
