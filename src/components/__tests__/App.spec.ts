import { describe, it, expect, beforeEach } from "vitest";
import { mount, VueWrapper, DOMWrapper } from "@vue/test-utils";
import App from "../../App.vue";
import { store } from "../../store";
import type { Movie } from "../../store";
import { nextTick } from "vue";

describe("App", () => {
  let wrapper: VueWrapper<InstanceType<typeof App>>;

  beforeEach(() => {
    wrapper = mount(App);
  });

  it("renders properly with initial movie list data", () => {
    // Ensure the component is mounted and exists
    expect(wrapper.exists()).toBe(true);

    // Find all movie items in the list
    const movieItems: DOMWrapper<HTMLLIElement>[] =
      wrapper.findAll(".movies-list__item");

    // Check that the number of movie items matches the length of the movies in the store
    expect(movieItems).toHaveLength(store.movies.length);

    store.movies.forEach((movie: Movie) => {
      // Find the movie item in the rendered list that matches the current movie's title
      const movieItem = movieItems.find((item: any) =>
        item.text().includes(movie.title)
      );

      // Check that the movie item was found
      expect(movieItem).not.toBeUndefined();

      // Verify that the movie item contains the movie's title, director, and synopsis
      expect(movieItem?.text()).toContain(movie.title);
      expect(movieItem?.text()).toContain(movie.director);
      expect(movieItem?.text()).toContain(movie.synopsis);

      const link = movieItem?.find("a");

      // Verify that the link exists and its href attribute matches the movie's IMDb link
      expect(link?.exists()).toBe(true);
      expect(link?.attributes("href")).toBe(movie.imdbLink);
    });
  });

  it("should remove a movie from movies list when a movie is deleted", async () => {
    // Ensure the component is mounted and exists
    expect(wrapper.exists()).toBe(true);

    // Find the delete button for the movie "Ghostbusters"
    const movieItemsBefore = wrapper.findAll(".movies-list__item");
    const ghostbustersItem = movieItemsBefore.find((item: any) =>
      item.text().includes("Ghostbusters")
    );
    expect(ghostbustersItem).not.toBeUndefined();

    // Simulate clicking the delete button
    const deleteButton = ghostbustersItem?.find(".movies-list__delete");
    expect(deleteButton?.exists()).toBe(true);
    await deleteButton?.trigger("click");

    await nextTick();

    // Ensure the modal is visible
    const modal = document.querySelector(".modal");
    expect(modal).not.toBeNull();

    // Confirm the deletion in the modal
    const confirmButton = document.querySelector(".modal__actions-confirm");
    expect(confirmButton).not.toBeNull();
    await (confirmButton as HTMLElement).click();

    await nextTick();

    // Check that the movie "Ghostbusters" is no longer in the list
    const updatedMovieItems = wrapper.findAll(".movies-list__item");
    const deletedMovieItem = updatedMovieItems.find((item: any) =>
      item.text().includes("Ghostbusters")
    );
    expect(deletedMovieItem).toBeUndefined();

    // Check movie list count changed from intial count to new count after deletion
    const updatedMovieItemsCount = updatedMovieItems.length;
    const initialMovieItemsCount = movieItemsBefore.length;
    expect(updatedMovieItemsCount).toBe(initialMovieItemsCount - 1);
  });

  it("sorts the movie list by title when the button is clicked", async () => {
    // Initial movie list order
    const initialTitles = store.movies.map((movie: Movie) => movie.title);

    // Find the sort by title button by its text content
    const buttons = wrapper.findAll("button");
    const sortByTitleButton = buttons.find(
      (button) => button.text() === "Sort by Title"
    );

    expect(sortByTitleButton).not.toBeUndefined();
    if (sortByTitleButton) {
      await sortByTitleButton.trigger("click");

      await nextTick();

      // Get the sorted movie items
      const sortedMovieItems: DOMWrapper<HTMLLIElement>[] =
        wrapper.findAll(".movies-list__item");

      // Extract titles from sorted movie items
      const sortedTitles = sortedMovieItems.map(
        (item) => item.text().split(" - ")[0]
      );

      // Check if movies were sorted by title
      const expectedTitles = [...initialTitles].sort((a, b) =>
        a.localeCompare(b)
      );

      expect(sortedTitles).toEqual(expectedTitles);
    }
  });
});
