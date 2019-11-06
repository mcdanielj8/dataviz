# Data Visualization Test
This project is a bar chart built in d3.js showing mean course price for varying groups of courses.

## Live Demo
https://mcdanielj8.github.io/dataviz/index.html

## Installation
`git clone https://github.com/mcdanielj8/dataviz.git`
`npm i`

## Running on local
From the project root directory: `live-server`

## Future improvements
Due to time constraints, there are some improvements that could be made:

### Dashboard
A bar chart was chosen for this visualization, but some of the categories (such as the IDs) would really benefit from being displayed in other formats - something that could be filtered, preferably. A line graph may be preferable for the months category. Turning this display into a dashboard with multiple visualization options would be my first improvement.

### Code Refactoring
Some of the JS code could be refactored, especially getting new data and formatting the dates. This would help with performance.

### Styling
As always, styling can be iterated and improved upon. The dashboard UX mentioned above is one major styling point, but there could also be improvements made in other places. Responsiveness would also be addressed in a future iteration, since right now the only responsiveness is SVG scaling. It may also be beneficial to add labels to each bar in the chart, although a consideration would have to be made for clutter vs amount of data presented.