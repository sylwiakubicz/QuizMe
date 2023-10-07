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
                // wywoływanie funkcji scroll za każdym razem, gdy scroll zmieni pozycje 
                $(window).on("scroll", function()
                    { setTimeout (handleScroll, 400) } )                
            })