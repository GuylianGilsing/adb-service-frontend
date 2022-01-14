import SearchURLCreator from "../../../src/functions/SearchURLCreator";

test('That appending a single thing to the search URL creates a valid get parameter chain', () => {
    // Arrange
    SearchURLCreator.clear();
    
    // Act
    SearchURLCreator.append("name", "test");

    // Assert
    expect(SearchURLCreator.get()).toBe('?name=test');
});

test('That appending two things to the search URL creates a valid get parameter chain', () => {
    // Arrange
    SearchURLCreator.clear();
    
    // Act
    SearchURLCreator.append("name", "test");
    SearchURLCreator.append("park", "test");

    // Assert
    expect(SearchURLCreator.get()).toBe('?name=test&park=test');
});

test('That appending multiple things to the search URL creates a valid get parameter chain', () => {
    // Arrange
    SearchURLCreator.clear();
    
    // Act
    SearchURLCreator.append("name", "test");
    SearchURLCreator.append("park", "test");
    SearchURLCreator.append("country", "test");
    SearchURLCreator.append("height", "100");

    // Assert
    expect(SearchURLCreator.get()).toBe('?name=test&park=test&country=test&height=100');
});
