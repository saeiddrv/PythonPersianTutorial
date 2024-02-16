# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'پایتون به پارسی'
copyright = '2015, Saeid Darvish'
author = 'Saeid Darvish'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = ["sphinxcontrib.jquery"]

templates_path = ['_templates']
exclude_patterns = []

language = 'fa'

master_doc = 'index'

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'sphinx_minoo_theme'
html_theme_path = ["_templates"]
html_title = 'کتاب ' + project

html_static_path = ['_static']
