import React from "react"
import "../style.css"
import $ from 'jquery';

function Header() {

    // $(function(){}) == $(document).ready(function() { ... }); - czyli czekamy aż strona się załaduje zanim wykonamy jakiekolwiem skrypty
    $(function() { 
        // Funkcja dodająca lub usuwająca klase z navbar w zależności od położenia scrolla
        function handleScroll() {
            if (document.documentElement.scrollTop <= 40) {
                if ($(".nav-container ").hasClass("navbar-scrolled")) {
                    $(".nav-container ").removeClass("navbar-scrolled")
                  }
                console.log("<=40")

            } else {
                $(".nav-container").addClass("navbar-scrolled")
                console.log("more than 40")
            }
        } 
                
        // wywołanie przy pierwszym uruchomieniu strony
        handleScroll()

        // // wywoływanie funkcji scroll za każdym razem, gdy scroll zmieni pozycje 
        // $(window).on("scroll", function()
        //     { setTimeout (handleScroll, 400) } )                
    })

    return (
        <nav className="navbar" onScroll={handleScroll}>
            <div className="nav--container">
                <div className="nav--logo_container">
                    <a className="nav--logo" href="#">
                        Qu<i className="fa-solid fa-question fa-rotate-180"></i>zMe
                    </a>
                </div>

                <div className="nav--main_menu">
                    <ul className="nav--list">
                        <li className="nav--item">
                            <a href="#" className="nav--link">Login</a>
                        </li>
                        <li className="nav--item btn">
                            <a href="#" className="nav--link">Create a quiz</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header