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
    const paginationLimit = 5;
    ///  const paginationLimit :한번에 표기할 <li>의 양
    const pageCount = Math.ceil(listItems.length / paginationLimit);
    let currentPage = 1;

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

    const appendPageNumber = (index) => {
      const pageNumber = document.createElement("button");
      pageNumber.className = "pagination-number";
      pageNumber.innerHTML = index;
      pageNumber.setAttribute("page-index", index);
      pageNumber.setAttribute("aria-label", "Page " + index);
      this.$paginationNumbers.appendChild(pageNumber);
    };

    const getPaginationNumbers = () => {
      for (let i = 1; i <= pageCount; i++) {
        appendPageNumber(i);
      }
    };

    const setCurrentPage = (pageNum) => {
      currentPage = pageNum;

      handleActivePageNumber();
      handlePageButtonsStatus();

      const prevRange = (pageNum - 1) * paginationLimit;
      const currRange = pageNum * paginationLimit;

      listItems.forEach((item, index) => {
        item.classList.add("hidden");
        if (index >= prevRange && index < currRange) {
          item.classList.remove("hidden");
        }
      });
    };

    window.addEventListener("load", () => {
      getPaginationNumbers();
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
