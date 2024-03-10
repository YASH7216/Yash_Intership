import React,{useEffect, useState,useRef} from 'react'
import { AiOutlineSearch } from "react-icons/ai"
import { BiChevronDown } from "react-icons/bi"
import { BsPen, BsArrowLeft } from "react-icons/bs"
import Popular from './Popular'
import { CgArrowsExchangeAltV } from "react-icons/cg"
import { AiFillStar } from 'react-icons/ai';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import SwiperCore, { EffectCoverflow } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/components/effect-coverflow/effect-coverflow.min.css';
SwiperCore.use([EffectCoverflow]);


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetting = {
  databaseURL: "https://learn-tech-4620e-default-rtdb.firebaseio.com"
}

const app = initializeApp(appSetting)
const database = getDatabase(app)
// const List = ref(database, 'List')

const cat = ref(database, 'Category')

let initialCategories = ['CINEMA','ENGINEERING', 'FIGMA', 'FOOD','JOURNALISM']

export default function Story() {
  const [swiper, setSwiper] = useState(null);

  const [subject, setSubject] = useState('')
  const [describe, setDescribe] = useState('')
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')


  const [search, setSearch] = useState('')
  const [searchResults2, setSearchResults2] = useState([])

  const [categories, setCategories] = useState([])
  const [newCat, setNewCat] = useState([])
  const [randomCat, setRandom] = useState([])
  const [mappable, setMappable] = useState([])

  const [show, setShow] = useState(false)
  const [show3, setShow3] = useState(false)
  const [show4, setShow4] = useState(false)
  const[menu, setMenu] = useState(false)
  const[flipped, setFlipped] = useState(false)
  const [content, setContent] = useState(false)
  
  const [check, setCheck] = useState('')
  const[selectedValue, setSelectedValue] = useState('')
  
  const[stories, setStories] = useState(0)
  const [expandedSections, setExpandedSections] = useState({})
  const [reveal, setReveal] = useState({})

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownRef2 = useRef(null);



  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const [isCategoryStarred, setIsCategoryStarred] = useState(false);

  const [favoriteCategories, setFavoriteCategories] = useState([]);
  const [isAnyCategoryStarred, setIsAnyCategoryStarred] = useState(false);

  const [starredCategories, setStarredCategories] = useState([]);
  const [popularCategories, setPopularCategories] = useState([]);

  useEffect(() => {
    // Fetch starred categories from local storage
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteCategories')) || [];
    setStarredCategories(storedFavorites);
  }, []);

  useEffect(() => {
    // Fetch popular categories
    // You can implement the logic to fetch popular categories here
    const popularCategories = []; // Implement the logic to fetch popular categories
    setPopularCategories(popularCategories);
  }, []);

  const sortCategories = (a, b) => {
    if (starredCategories.includes(a)) return -1;
    if (starredCategories.includes(b)) return 1;
    return 0;
  };

  // Combine starred and popular categories, append popular categories to fill total count to 10
  const combinedCategories = [...starredCategories, ...popularCategories]
    .sort(sortCategories)
    .slice(0, 10);


  useEffect(() => {
    // Load favorite categories from local storage
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteCategories'));
    if (storedFavorites) {
      setFavoriteCategories(storedFavorites);
      setIsAnyCategoryStarred(true);
    }
  }, []);


  const toggleFavorite = (category) => {
    let updatedFavorites;
    if (favoriteCategories.includes(category)) {
      updatedFavorites = favoriteCategories.filter((fav) => fav !== category);
    } else {
      updatedFavorites = [...favoriteCategories, category];
    }
    setFavoriteCategories(updatedFavorites);
    localStorage.setItem('favoriteCategories', JSON.stringify(updatedFavorites));
    setIsAnyCategoryStarred(updatedFavorites.length > 0);
  };


  


  useEffect(() => {
    // Load the user's starred category from local storage
    const starredCategory = localStorage.getItem('starredCategory');
    if (starredCategory === 'true') {
      setIsCategoryStarred(true);
    }
  }, []);

  const handleStarCategory = () => {
    toggleFavorite(selectedValue);
    setIsCategoryStarred(prev => {
      const newState = !prev;
      // Save the user's action of starring the category locally
      localStorage.setItem('starredCategory', newState);
      return newState;
    });
  };
  




const displayToast = (message) => {
    console.log("Display toast with message:",message);
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
  };


  



  







  

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShow(false); // Close the dropdown
      }
    };
   // Add event listener for clicks on document body
    document.body.addEventListener('click', handleOutsideClick);

    // Cleanup function to remove event listener
    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef2.current && !dropdownRef2.current.contains(e.target)) {
        setShowDropdown(false); // Close the dropdown
      }
    };

    // Add event listener for clicks on document body
    document.body.addEventListener('click', handleOutsideClick);

    // Cleanup function to remove event listener
    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, []);




  useEffect(() => {
    onValue(cat, function(snapshot){
      if(snapshot.exists()){
        const entries = Object.entries(snapshot.val())
        setCategories(entries.map(item => item[1]))
        setNewCat(entries.map(item => item[1]))
        setRandom(entries.map(item => item[1]))
      }
    })
  }, [])
  
  useEffect(() => {
    if (randomCat.length > 0) {
      const random = Math.floor((Math.random() * categories.length))
      setCheck(randomCat[random])
    }
  }, [randomCat])


    function getCurrentDateTime(){
      const now = new Date()
      const day = String(now.getDate()).padStart(2, '0')
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const year = String(now.getFullYear())
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const seconds = String(now.getSeconds()).padStart(2, '0')
  
      return `${day}-${month}-${year}-${hours}-${minutes}-${seconds}`
    }

  function handleValue(e){
    const name = e.target.name
    const value = e.target.value
    
    if(name === 'subject'){
      setSubject(value)
    }
    
    else if(name === 'description'){
      setDescribe(value)
    }
  }
  
  function handleSearch(e){
    const searchValue = e.target.value
    setSearchText(searchValue)
    
    const results = performSearch(searchValue)
    setSearchResults(results)
    
    
  }
  
  function handleSearch2(e){
    setSearch(e.target.value)
    setMenu(false)
    setShow3(true)
    
    const results = performSearch2(e.target.value)
    setSearchResults2(results)
  }
  
  function handleCategorySelect(category){
    setSelectedCategory(category.toUpperCase())
    setSearchText('')
    setSearchResults([])
    setShow(false)
  }

  function handleCategorySelect2(category){
    setSelectedValue(category)
    setSearch(category)
    setSearchResults2([])
    searchBar(category)
  }

  function performSearch(searchValue){
    const filteredCategories = categories && categories.filter(category => 
      category.toLowerCase().startsWith(searchValue.toLowerCase()))

    return filteredCategories
  }

  function performSearch2(searchValue){
    const filteredCategories = randomCat && randomCat.filter(category => 
      category.toLowerCase().startsWith(searchValue.toLowerCase()))

    return filteredCategories
  }

  function clear(){
    setSubject('')
    setDescribe('')
    setSearchText('')
    setSelectedCategory('')
  }

  function handleSubmit(e){
    const random = ((Math.random() * 4))
    e.preventDefault()
    const Data ={
      subject: subject,
      description: describe,
      category: selectedCategory,
      timeStamp: getCurrentDateTime(),
      id: random 
    }

    if(subject && describe && selectedCategory){
      push(ref(database, `List/${selectedCategory}`), Data)

      if(selectedCategory){
        if(newCat && !newCat.some((item) => (item.toLowerCase() === selectedCategory.toLowerCase()))){
          push(cat , selectedCategory)
        }
        clear()
      }
  displayToast("Story Posted sucessFully")

    }

    // setContent(false)
    
  }

  function handleShow(){
    setShow(prev => !prev)
  }

  function handleAdd(){
    setSelectedCategory(searchText.toUpperCase())
    setSearchText('')
    setSearchResults([])
    setShow(false)

    if(searchText){
      if(initialCategories && !initialCategories.some((item) => (item.toLowerCase() === searchText.toLowerCase()))){
        setCategories((prevCategories) => [...prevCategories, searchText])
        initialCategories.push(searchText)
      }
    }
  }

  function searchBar(cat){
    cat && setMenu(true)
    setShow3(false)
    setShow4(false)
  }



  function handleClick(e){
    setShow3(prev => !prev)
    setShow4(false)
    // const ulist=document.querySelector('.search-list-2')
    
    //   ulist.classList.toggle('search-list search-list-2 hidden')
    //   e.stopPropagation()


    //   document.addEventListener('click',(e)=>{
    //     if(e.target.closest('.ulist')) return 
    //     ulist.classList.add('search-list search-list-2 hidden')
    //   })
    

  }

  function handleClick2(){
    setShow4(prev => !prev)
    setShow3(false)
  }
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    windowWidth >425 ? setContent(true) : setContent(false)
  }, [windowWidth])

  function handleflip(){
    setFlipped(prev => !prev)
  }

  
  function handleChildValue(value){
    setSelectedValue(value)
    setSearch('')
  }

  
  
  function formattedDate(dateTimeString){
    const dateTimeParts = dateTimeString.split('-')
    
    const day = dateTimeParts[0]
    const month = dateTimeParts[1]
    const year = dateTimeParts[2]
    
    return `${day}-${month}-${year}`
    
  }
  
  function formattedDate2(dateTimeString){
    const dateTimeParts = dateTimeString.split('-')
    
    const day = dateTimeParts[0]
    const month = dateTimeParts[1]
    const year = dateTimeParts[2]
    
    return `${month}-${day}-${year}`
    
  }
  
  function formattedTime(dateTimeString){
    const dateTimeParts = dateTimeString.split('-')
    
    const hours = dateTimeParts[3]
    const minutes = dateTimeParts[4]
    const seconds = dateTimeParts[5]
    
    return `${hours}-${minutes}-${seconds}`
    
  }

  useEffect(() => {
    if(windowWidth>425){
      setReveal({})
    }

    else if(windowWidth<=425){
        setShow4(false)
        setShow(false)
    }
  }, [windowWidth])

  function togglePara(itemId) {
   windowWidth > 425 ?  
   (setExpandedSections((prevExpandedSections) => ({
     ...prevExpandedSections,
     [itemId]: !prevExpandedSections[itemId],
   }))) : 

   (setReveal((prevReveal) => ({
    ...prevReveal,
    [itemId]: !prevReveal[itemId],
  })))
  }

  const revealMain = {
    position: 'absolute',
    top: '0px',
    left: windowWidth > 375 ? '-75px' : windowWidth > 320 ?  '-90px' : '-80px',
    width:  windowWidth > 320 ? '283px' : '250px',
    height: '257px',
    boxShadow: '1px 1px 0px #000000',
  }
  
  const revealhead = {
    alignSelf: 'center',
    width: '194px',
    marginBottom: '8px',
  }

  const revealPara = {
    marginTop: 'initial',
    width: '215px',
    overflowY: reveal ? 'auto' : 'hidden',
    maxHeight: '112px',
    fontSize: '0.625rem'
  }

  function goback(){
    setReveal({})
  }


const ipt=document.querySelector('.ipt-1')
const ulist=document.querySelector('.search-list-2')


// ipt.addEventListener







  useEffect(() => {
    if(selectedValue){
      onValue(ref(database, `List/${selectedValue.toUpperCase()}`), function(snapshot) {
        if (snapshot.exists()) {
          setStories(Object.entries(snapshot.val()).length)
          setMappable(Object.entries(snapshot.val()))
        }
      })
    }
    setReveal({})
    
  }, [selectedValue])
  
  useEffect(() => {
     if(check){
      onValue(ref(database, `List/${check.toUpperCase()}`), function(snapshot) {
        if (snapshot.exists()) {
          setStories(Object.entries(snapshot.val()).length)
          setMappable(Object.entries(snapshot.val()))
        }
      })
    }

    setReveal({})

  }, [check])

  
  useEffect(() => {
    if(search){
      onValue(ref(database, `List/${search.toUpperCase()}`), function(snapshot) {
        if (snapshot.exists()) {
          setStories(Object.entries(snapshot.val()).length)
          setMappable(Object.entries(snapshot.val()))
        }
        else{
          displayToast("No stories found for this searched category")
        }

      })      
    }
   
    setReveal({})
  }, [search,stories])


  function showContent(){
    setContent(prev => !prev)
  }


  function paragraph(item) {
    if (item) {
      const words = item[1].split(' ');
      const isExpanded = expandedSections[item[2]];
      const isRevealed = reveal[item[2]];
  
      const shouldShowReadMore = words.length > 24 && !isExpanded;
  
      return (
        <div className='item-section' key={item[2]} style={isRevealed ? revealMain : {}}>
          <div className='item-category'>
            <h3>{item[0]}</h3>
            <p>{formattedDate(item[4])}</p>
          </div>
          {isRevealed && <BsArrowLeft className='left-arrow' onClick={goback} />}
          <h2 style={isRevealed ? revealhead : {}}>{item[3]}</h2>
          <div className='show-para'>
            {isRevealed ? (
              <p style={isRevealed ? revealPara : {}}>{item[1].slice(0, item[1].length)}...</p>
            ) : (
              <p>{shouldShowReadMore ? item[1].slice(0, 154) : item[1]}</p>
            )}
          </div>
          {!isRevealed && shouldShowReadMore && (
            <span className='read-more' onClick={() => togglePara(item[2])}>
              Read more...
            </span>
          )}
          {isExpanded && (
            <span className='read-more' onClick={() => togglePara(item[2])}>
              Read less
            </span>
          )}
        </div>
      );
    }
  }
  

  function sorted(mappable){
    const sortedMappable = mappable.sort((a, b) => {
      const dateA = new Date(formattedDate2(Object.values(a[1])[4]))
      const dateB = new Date(formattedDate2(Object.values(b[1])[4]))

      if(dateA < dateB){
        return flipped ? 1 : -1
      }

      if (dateA > dateB) {
        return flipped ? -1 : 1;
      }

      const timeA = formattedTime(Object.values(a[1])[4]);
      const timeB = formattedTime(Object.values(b[1])[4]);

      if (timeA < timeB) {
        return flipped ? 1 : -1;
      }
      if (timeA > timeB) {
        return flipped ? -1 : 1;
      }
     })

    return sortedMappable.map((items, index) => {
      const random = ((Math.random() * 4))
      return (
        <div key={random} className='single-items'>
          {paragraph(Object.values(items[1]))}
        </div>
      )
    })
  }


 



  return (


    
    <div className='flex'>
      <Popular onChildValue={handleChildValue} />
      {showToast && (
  <div className="toast">
     <h1><p>{toastMessage}</p></h1>
  </div>
)}
      <div className='story-section'>
   <form className='section-1' >
            <div className='section-1-head'>
              <h1>Write your own story</h1>
              <BsPen className='pen' onClick={showContent}/>
            </div>
            { content && <div className='section-1-content' >
              <div className="subject">
                  <label htmlFor="subject"><h3>Topic</h3></label>
                  <input id="subject"
                      name="subject" 
                      type='text'
                      placeholder='write the topic for your story ' 
                      value={subject}
                      onChange={(e) => handleValue(e)} required/>
              </div>

              <div className="description">
                  <label htmlFor="describe"><h3>Description</h3></label>
                  <textarea 
                    value={describe} 
                    name='description'
                    id='describe'
                    placeholder='write what your story is about here'
                    onChange={(e) => handleValue(e)} required/>
              </div>

              <div className='selectCategory' ref={dropdownRef}>

                <div className='select-btn' onClick={handleShow}>
                  {selectedCategory ? <span>{selectedCategory.toUpperCase()}</span> : 
                  <span>Select a category</span>}
                  <BiChevronDown className='down'/>
                </div>
                
                {show && <div className='content' >
                  <div className='search'>
                    <AiOutlineSearch className='search-btn'/>
                    <input
                      type="text"
                      id='category'
                      placeholder="Search"
                      value={searchText}
                      onChange={handleSearch} required/>
                  </div>
{searchText.length === 0 ? 
                    (<ul className='search-list'>
                    {initialCategories.map(category => (
                      <li key={category} onClick={() => handleCategorySelect(category)}>
                        {category}
                        </li>
                    ))}
                    </ul>) :
                    searchResults.length > 0 ? (
                    <ul className='search-list'>
                        {searchResults.map(category => (
                          <li key={category} onClick={() => handleCategorySelect(category)}>
                            {category}
                            </li>
                        ))}
                        </ul>
                    ) :
                    <ul className='search-list'>
                      <li onClick={handleAdd}>Add new category</li>
                    </ul>}

                  </div>}
              </div>
<button type='submit' className='submit-btn' onClick={handleSubmit}>
                  PUBLISH YOUR STORY
              </button>
            </div>}
        </form>

        <div className='middle-line'/>

        <section className='section-2'>

        <div className='section-2-head'>
  <h1>{selectedValue ? `Read stories on ${selectedValue.toUpperCase()}` : 'Read their stories'}</h1>
  <h1>{isAnyCategoryStarred ? 'Favourite Topic' : 'Popular Topic'}</h1>

  <div className='looking'  ref={dropdownRef2} >
    <div className='choose' >
      <label htmlFor='choose' ><h3>What are you looking for?</h3></label>
      <input
        className="ipt-1"
        type="text"
        id='choose'
        placeholder="Browse a Category"
        value={search}
        onClick={() => setShowDropdown(true)}
        onChange={handleSearch2} required/>
      <BiChevronDown className='btn-2' onClick={handleClick2}/>
    </div>
              
              
            
               { showDropdown && (
                <div className="show-drop" ref={dropdownRef}>
                {show4 ? (
                  <ul className='search-list search-list-2 hidden'>
                    {initialCategories.map(category => (
                      <li key={category} onClick={() => handleCategorySelect2(category)}>
                        {category}
                      </li>
                    ))}
                  </ul>
                ) : show3 && search.length === 0 ? (
                  <ul className='search-list search-list-2 hidden'>
                    {initialCategories.map(category => (
                      <li key={category} onClick={() => handleCategorySelect2(category)}>
                        {category}
                      </li>
                    ))}
                  </ul>
                ) : (show3 && searchResults2.length > 0) && (
                  <ul className='search-list search-list-2 hidden'>
                    {searchResults2.map(category => (
                      <li key={category} onClick={() => handleCategorySelect2(category)}>
                        {category}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              
                )}
              
   



            </div>          
          </div>

          <div className='filter'>
  <h1 className='total-story'>
    <span>{stories === 1 ? `${stories} story` : stories === 0 ? `0 story` : `${stories} stories`}</span> for you to read
  </h1>
  <div className='flex-filter'>
    <h2 className='filter-heading'>Sort: 
      <span onClick={handleflip}>
        {flipped ? `Newest to Oldest` : `Oldest to Newest`}
      </span>
    </h2>
    <div className="star-icon" onClick={handleStarCategory}>
     <h3> <AiFillStar color={isCategoryStarred ? 'gold' : 'gray'} /></h3>
    </div>
    <CgArrowsExchangeAltV className='filterarrow' onClick={handleflip} />
  </div>
</div>

          
          { windowWidth > 425 ? <div>
            {selectedValue &&  (
              <div className='container'>
                <section className='item-section-main'>
                  <div className='item-section-container'>
                    {(check && mappable) && sorted(mappable)}
                </div>
              </section>
              </div>
            )}

              {(!menu || search.length === 0) &&  (<div className='container'>
                <section className='item-section-main'>
                  <div className='item-section-container'>
                    {(check && mappable) && sorted(mappable)}
                  </div>
                </section>
              </div>) 
              }

              {(search.length > 0 && menu) &&  (<div className='container'>
                <section className='item-section-main'>
                  <div className='item-section-container'>
                    {sorted(mappable)}
                  </div>
                </section>
            </div>) 
            }
          </div>
          : 
          (<div className='container'>
            <section className='item-section-main'>
                <Swiper 
                  effect="coverflow"
                  // grabCursor='true'
                  centeredSlides='true'
                  slidesPerView={3}
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 200,
                    modifier: 1,
                    slideShadows: false,
                  }}
                  // onSwiper={handleSwiperInit}
                  // onSlideChange={handleSlideChange}
                >
                  <div className='swiper-wrapper'>
                    {(() => { const sortedMappable = mappable.sort((a, b) => {
                      const dateA = new Date(formattedDate2(Object.values(a[1])[4]))
                      const dateB = new Date(formattedDate2(Object.values(b[1])[4]))

                      if(dateA < dateB){
                        return flipped ? 1 : -1
                      }

                      if (dateA > dateB) {
                        return flipped ? -1 : 1;
                      }

                      const timeA = formattedTime(Object.values(a[1])[4]);
                      const timeB = formattedTime(Object.values(b[1])[4]);

                      if (timeA < timeB) {
                        return flipped ? 1 : -1;
                      }
                      if (timeA > timeB) {
                        return flipped ? -1 : 1;
                      }
                    })

                    return sortedMappable.map((items, index) => {
                      const random = ((Math.random() * 4))
                      return (
                        <SwiperSlide key={random} className='swiper-slide'>
                          {paragraph(Object.values(items[1]))}
                        </SwiperSlide>
                      )
                    })
                    })()}
                  </div>
                </Swiper>
            </section>
          </div>)}
        </section>       
      </div>
    </div>
    
  )
}