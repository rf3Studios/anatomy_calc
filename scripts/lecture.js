/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2013 rf3Studios.com <Rich Friedel>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Lecture Class
 *
 * @constructor
 */
function Lecture() {
}

/**
 * Returns the average of all the exam grades
 *
 * Note: If there are two exams and the second exam grade is higher than
 *       the first exam grade take the difference of the two grades,
 *       divide the result by two and the result to the first exam grade.
 *
 * @param lecExams Array of all exam grades
 * @returns {number} The average of all the exam grades as a percentage
 */
Lecture.prototype.calculateExamAverage = function (lecExams) {

    // Are there at least two exams?
    if (lecExams.length > 1) {
        var _examGrade = 0.00;

        // Is the second exam greater than the first exam?
        if (lecExams[1] > lecExams[0]) {
            // Take the difference, divide it by two and add that value to the first exam grade
            // Example: exam 1 => 50 ... exam 2 => 70 ... 70 - 50 == 20 ... 20 / 2 == 10 ... 10 + 50 == 60
            // So, the first exam value now becomes 60 instead of 50
            _examGrade = lecExams[0] + ((lecExams[1] - lecExams[0]) / 2);
        } else {
            // The first exam is greater than the first so do nothing with the grade.
            _examGrade = lecExams[0];
        }

        // Loop through the rest of the array and add the grades up
        for (var i = 1; i < lecExams.length; i++) {
            _examGrade += lecExams[i];
        }

        // Return the average of all the exams
        return _examGrade / lecExams.length;

    } else {
        // There is only one exam
        return lecExams[0];
    }
};

/**
 * Get the average value of all the quiz grades
 *
 * Note: The lowest grade is not counted. If all the grades are the same,
 *       remove one of the grades and find the average of the remaining
 *       grades
 *
 * @throws {RangeError} Both arrays must be equal or an exception will be thrown
 * @param baseVals An array of quiz base values (highest possible points)
 * @param gradeVals An array of the quiz grades
 * @returns {number} The average of all the quiz grades with the lowest grade removed
 */
Lecture.prototype.calculateQuizAverage = function (baseVals, gradeVals) {
    // Both arrays must be equal in length because it is a 1:1 ratio
    if (baseVals.length !== gradeVals.length) {
        throw new RangeError("Both arrays must be equal length");
    }

    var _baseTotal = 0;
    var _gradeTotal = 0;

    // Get the lowest value
    var _minVal = Math.min.apply(Math, gradeVals);

    // Find the lowest value's index
    var indexOfLowVal = gradeVals.indexOf(_minVal);

    // Remove low value and its associated base value
    baseVals.splice(indexOfLowVal, 1);
    gradeVals.splice(indexOfLowVal, 1);

    // Loop through the arrays and add the values up
    for (var i = 0; i < baseVals.length; i++) {
        _baseTotal += baseVals[i];
        _gradeTotal += gradeVals[i];
    }

    return (_gradeTotal / _baseTotal) * 100;
};

/**
 * Calculate the weighted exam grades
 *
 * @param examGradeList
 * @returns {number}
 */
Lecture.prototype.calculateWeightedExamGrade = function (examGradeList) {
    return this.calculateExamAverage(examGradeList) * 0.7;
};

/**
 * Calculate the weighted final exam grade
 *
 * @param finalExamGrade
 * @returns {number}
 */
Lecture.prototype.calculateWeightedFinalExamGrade = function (finalExamGrade) {
    return finalExamGrade * 0.2;
};

/**
 * Calculate the weighted quiz grade
 *
 * @param quizList
 * @returns {number}
 */
Lecture.prototype.calculateWeightedQuizGrade = function (quizList) {
    try {
        return this.calculateQuizAverage(quizList[0], quizList[1]) * 0.1;
    } catch (e) {
        console.log(e.toString());
        return -1;
    }
};

/**
 * Calculate the weighted total grade
 *
 * @param examList
 * @param quizList
 * @param finalExam
 * @param daysMissed
 * @returns {number}
 */
Lecture.prototype.calculateWeightedTotal = function (examList, quizList, finalExam, daysMissed) {
    var _weightedGrade = (this.calculateWeightedExamGrade(examList) + this.calculateWeightedQuizGrade(quizList) + this.calculateWeightedFinalExamGrade(finalExam)) * 0.75;

    if (daysMissed >= 7) {
        return -1;
    } else if (daysMissed > 3) {
        return _weightedGrade - ((daysMissed - 3 ) * 2);
    } else {
        return _weightedGrade;
    }
};