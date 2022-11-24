//매계변수에 대하여
//$target 은 index로 넘어온 설치 태그의 클레스를 잡아준다.
//new App({ $target: document.querySelector(".App") });
//initiaState에는 리스트를 넣어준다.
function Pagination({ $target, initialState }) {
  //this.state를 가져간다.

  this.state = initialState;

  //this.setState
  this.setState = (nextstate) => {
    this.state = nextstate;
    this.render();
    // li는 this.$paginatedList안에 들어있는 목록이다. 우리는 배열을 맵해줄거니
    //또 생각해 봐야한다.
  };

  this.render = () => {
    //map부분을 변경하는 것으로 <li를 변경가능>
    this.$paginatedList.innerHTML = `${this.state
      .map((item) => {
        return `<li>${item}</li>`;
      })
      .join("")}`;

    const listItems = this.$paginatedList.querySelectorAll("li");

    ///  const paginationLimit :한번에 표기할 <li>의 양
    const paginationLimit = 10;
    ///  const paginationLimit :한번에 표기할 <li>의 양

    // 버튼 갯수관련이다.
    const pageCount = Math.ceil(listItems.length / paginationLimit);
    //기본페이지다.
    let currentPage = 1;

    console.log("pageCount", pageCount);
    ///버튼 활성화
    const disableButton = (button) => {
      button.classList.add("disabled");
      button.setAttribute("disabled", true);
    };

    const enableButton = (button) => {
      button.classList.remove("disabled");
      button.removeAttribute("disabled");
    };

    const handlePageButtonsStatus = () => {
      if (currentPage === 1) {
        disableButton(this.$prevButton);
      } else {
        enableButton(this.$prevButton);
      }

      if (pageCount === currentPage) {
        disableButton(this.nextButton);
      } else {
        enableButton(this.nextButton);
      }
    };

    const handleActivePageNumber = () => {
      document.querySelectorAll(".pagination-number").forEach((button) => {
        button.classList.remove("active");
        const pageIndex = Number(button.getAttribute("page-index"));
        if (pageIndex == currentPage) {
          button.classList.add("active");
        }
      });
    };
    //pagination-button 갯수 구현
    const appendPageNumber = (index) => {
      const pageNumber = document.createElement("button");
      pageNumber.className = "pagination-number";
      pageNumber.innerHTML = index;
      pageNumber.setAttribute("page-index", index);
      pageNumber.setAttribute("aria-label", "Page " + index);
      this.$paginationNumbers.appendChild(pageNumber);
    };
    //pagination-button 갯수 구현
    //pageCount 만큼 구현한다.
    const getPaginationNumbers = () => {
      for (let i = 1; i <= pageCount; i++) {
        appendPageNumber(i);
      }
    };
    const buttonItem = document.querySelectorAll(".pagination-number");

    ///  paginationButtonLimit :한번에 표기할 button의 양
    const paginationButtonLimit = 9;
    ///  paginationButtonLimit :한번에 표기할  button의 양

    /// 여기서 li의 갯수를 구현
    //pageNum 값은 currentPage 값이 된다. 그 값을 보내준다.
    const setCurrentPage = (pageNum) => {
      currentPage = pageNum;
      const buttonItem = document.querySelectorAll(".pagination-number");

      //pagination-button을 액티브한다.
      handleActivePageNumber();

      //pagination-화살표 앞 뒤를 판단하여 액티브할지 안할지를 정한다.
      handlePageButtonsStatus();

      const prevRange = (currentPage - 1) * paginationLimit;
      const currRange = currentPage * paginationLimit;

      listItems.forEach((item, index) => {
        item.classList.add("hidden");
        if (index >= prevRange && index < currRange) {
          item.classList.remove("hidden");
        }
      });

      //한 번에 출력되는 버튼의 수 시정가능
      //1부터 5까지는 변화 없이 왼쪽으로만 이동한다.
      if (pageNum <= 5) {
        buttonItem.forEach((item, index) => {
          item.classList.add("hidden");
          if (index < 9) {
            item.classList.remove("hidden");
          }
        });
      } else {
        buttonItem.forEach((item, index) => {
          item.classList.add("hidden");
          if (pageNum - 5 <= index && index < pageNum + 4) {
            item.classList.remove("hidden");
          }
        });
      }
    };
    // 로드 될때 조건
    window.addEventListener("load", () => {
      // 버튼을 랜더링함
      getPaginationNumbers();
      //1번 페이지를 렌더링 하는 것으로 화면 랜더링 시작
      setCurrentPage(1);

      this.$prevButton.addEventListener("click", () => {
        setCurrentPage(currentPage - 1);
      });

      this.nextButton.addEventListener("click", () => {
        setCurrentPage(currentPage + 1);
      });

      document.querySelectorAll(".pagination-number").forEach((button) => {
        const pageIndex = Number(button.getAttribute("page-index"));

        if (pageIndex) {
          button.addEventListener("click", () => {
            setCurrentPage(pageIndex);
          });
        }
      });
    });
  };
  this.$paginatedList = document.createElement("div");
  this.$paginatedList.setAttribute("data-current-page", "1");
  this.$paginatedList.setAttribute("aria-label", "Previous page");
  this.$paginatedList.id = "paginated-list";

  this.$paginationContainer = document.createElement("nav");
  this.$paginationContainer.className = "pagination-container";

  this.$prevButton = document.createElement("button");
  this.$prevButton.className = "pagination-button";
  this.$prevButton.id = "prev-button";
  this.$prevButton.innerHTML = "&lt;";
  this.$prevButton.setAttribute("aria-label", "Previous page");
  this.$prevButton.setAttribute("title", "Previous page");

  this.$paginationNumbers = document.createElement("div");
  this.$paginationNumbers.className = "pagination-numbers";
  this.$paginationNumbers.id = "pagination-numbers";

  this.nextButton = document.createElement("button");
  this.nextButton.className = "pagination-button";
  this.nextButton.id = "next-button";
  this.nextButton.innerHTML = " &gt;;";
  this.nextButton.setAttribute("aria-label", "Next page");
  this.nextButton.setAttribute("title", "Next page");

  this.$paginationContainer.appendChild(this.$prevButton);
  this.$paginationContainer.appendChild(this.$paginationNumbers);
  this.$paginationContainer.appendChild(this.nextButton);

  $target.appendChild(this.$paginatedList);
  $target.appendChild(this.$paginationContainer);

  this.render();
}

export default Pagination;
