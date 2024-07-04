import { createRef, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { getImages } from "../api";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageInfo, setImageInfo] = useState({ alt: "", url: "" });

  const galleryRef = createRef();

  useEffect(() => {
    console.log(galleryRef);
    if (!galleryRef.current) return;
    if (page > 1) {
      const heightOfTwoRows = 400;
      const scrollHeight = galleryRef.current.offsetTop + heightOfTwoRows;
      window.scrollBy({
        top: scrollHeight,
        behavior: "smooth",
      });
    }
  });

  useEffect(() => {
    async function fetchImages() {
      if (query.trim() === "") return;
      try {
        setIsError(false);
        setIsLoading(true);
        const imagesData = await getImages(query, page);
        setImages((prevState) => [...prevState, ...imagesData.results]);
        setIsLast(() => imagesData.total_pages === page);
        if (imagesData.total === 0) {
          const notifyNoResults = () =>
            toast.error("We did not find anything for your query. Try again!", {
              position: "top-right",
            });
          return notifyNoResults();
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImages();
  }, [query, page]);

  const handleSearch = async (topic) => {
    setQuery(topic);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = async () => {
    setPage(page + 1);
    scrollBy(0, 2000);
  };

  const openModal = (alt, url) => {
    setIsModalOpen(true);
    setImageInfo({ alt, url });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setImageInfo({ alt: "", url: "" });
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <Toaster />
      {images.length > 0 && (
        <ImageGallery ref={galleryRef} openModal={openModal} data={images} />
      )}
      <ImageModal
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        imageInfo={imageInfo}
      />
      {isLoading && <Loader />}
      {isError && <ErrorMsg />}
      {images.length > 0 && !isLoading && !isLast && !isError && (
        <LoadMoreBtn onLoadMore={handleLoadMore} />
      )}
    </div>
  );
}
