Public Class calcMain

    Private num1 As Double
    Private num2 As Double
    Private operation As Char
    Private expectsResult As Boolean

    Private Sub calcMain_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        num1 = 0
        num2 = 0
        txtboxSolution.Text = ""
        expectsResult = Nothing
    End Sub

    Private Sub handleSolutionText(Num As Char)
        If txtboxSolution.Text = "0" Then
            txtboxSolution.Text = Num
        Else
            txtboxSolution.Text = txtboxSolution.Text & Num
        End If
    End Sub

    Private Sub btnNum0_Click(sender As Object, e As EventArgs) Handles btnNum0.Click
        If txtboxSolution.Text <> "0" Then
            handleSolutionText("0")
        End If
    End Sub

    Private Sub btnNum1_Click(sender As Object, e As EventArgs) Handles btnNum1.Click
        handleSolutionText("1")
    End Sub

    Private Sub btnNum2_Click(sender As Object, e As EventArgs) Handles btnNum2.Click
        handleSolutionText("2")
    End Sub

    Private Sub btnNum3_Click(sender As Object, e As EventArgs) Handles btnNum3.Click
        handleSolutionText("3")
    End Sub

    Private Sub btnNum4_Click(sender As Object, e As EventArgs) Handles btnNum4.Click
        handleSolutionText("4")
    End Sub

    Private Sub btnNum5_Click(sender As Object, e As EventArgs) Handles btnNum5.Click
        handleSolutionText("5")
    End Sub

    Private Sub btnNum6_Click(sender As Object, e As EventArgs) Handles btnNum6.Click
        handleSolutionText("6")
    End Sub

    Private Sub btnNum7_Click(sender As Object, e As EventArgs) Handles btnNum7.Click
        handleSolutionText("7")
    End Sub

    Private Sub btnNum8_Click(sender As Object, e As EventArgs) Handles btnNum8.Click
        handleSolutionText("8")
    End Sub

    Private Sub btnNum9_Click(sender As Object, e As EventArgs) Handles btnNum9.Click
        handleSolutionText("9")
    End Sub
    ' End Number Buttons Section

    ' Operator Section
    Private Sub btnOpEquals_Click(sender As Object, e As EventArgs) Handles btnOpEquals.Click
        Select Case operation
            Case "+"
                num2 = txtboxSolution.Text
                txtboxSolution.Text = num1 + num2
                expectsResult = False

            Case "-"
                num2 = txtboxSolution.Text
                txtboxSolution.Text = num1 - num2
                expectsResult = False

            Case "*"
                num2 = txtboxSolution.Text
                txtboxSolution.Text = num1 * num2
                expectsResult = False

            Case "/"
                num2 = txtboxSolution.Text
                txtboxSolution.Text = num1 / num2
                expectsResult = False

            Case Else
                Console.WriteLine("No operator selected error")
        End Select
    End Sub

    Private Sub btnOpPlus_Click(sender As Object, e As EventArgs) Handles btnOpPlus.Click
        handleOperation("+")
    End Sub

    Private Sub btnOpMinus_Click(sender As Object, e As EventArgs) Handles btnOpMinus.Click
        handleOperation("-")
    End Sub

    Private Sub btnOpMult_Click(sender As Object, e As EventArgs) Handles btnOpMult.Click
        handleOperation("*")
    End Sub

    Private Sub btnOpDiv_Click(sender As Object, e As EventArgs) Handles btnOpDiv.Click
        handleOperation("/")
    End Sub

    ' Sub for operation button click
    '   Determines whether we are handling num1 or num2 
    '   If calc already expects user to click "=" then only change operator
    Private Sub handleOperation(Op As Char)
        If operation = Nothing Or (operation <> Op And txtboxSolution.Text <> "") Then
            operation = Op
            num1 = txtboxSolution.Text
            txtboxSolution.Text = ""
            expectsResult = True
        Else
            If Not expectsResult And txtboxSolution.Text <> "" Then
                num1 = txtboxSolution.Text
                txtboxSolution.Text = ""
            Else
                operation = Op
            End If
        End If
    End Sub

    Private Sub btnOpClr_Click(sender As Object, e As EventArgs) Handles btnOpClr.Click
        txtboxSolution.Text = ""
        expectsResult = False
        operation = Nothing
    End Sub
    ' End Operation Buttons Section
End Class
